import { useEffect, useState } from "react";
import { Button, TextInput } from "@emorg-prd/standard-react";
import { DataTable, type DataTableColumn } from "@/components/common/data-table/data-table";
import { LoadingSpinner } from "@/components/common/loading-spinner/loading-spinner";
import { LocationApiService } from "@/services/location-api.service";
import { MasterDataApiService, type LookupRecord } from "@/services/master-data-api.service";
import type { SiteSummary } from "@/models/api/location-dto";
import styles from "./location-record.module.css";

const EMORGTextInput = TextInput as unknown as (props: any) => JSX.Element;

type SiteTabProps = {
    locationId: string;
};

// A Location has at most one Site today (see SiteSummary / GetLocationSiteHandler
// on the API) — so this renders a single-row table plus a search-to-link combo
// when nothing is linked yet, rather than a full list-management UI.
export function SiteTab({ locationId }: SiteTabProps) {
    const [site, setSite] = useState<SiteSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [countryNamesById, setCountryNamesById] = useState<Record<string, string>>({});

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<LookupRecord[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLinking, setIsLinking] = useState(false);

    useEffect(() => {
        setLoadError(null);
        // allSettled, not all: a failing /countries call (used only to show a
        // country *name* instead of a raw id) must not stop the site itself —
        // the one call that actually matters — from ever rendering.
        Promise.allSettled([
            LocationApiService.getLocationSite(locationId),
            MasterDataApiService.getCountries(),
        ]).then(([siteResult, countriesResult]) => {
            if (siteResult.status === "fulfilled") {
                setSite(siteResult.value ?? null);
            } else {
                setLoadError(
                    siteResult.reason instanceof Error ? siteResult.reason.message : "Failed to load the linked site."
                );
            }

            if (countriesResult.status === "fulfilled") {
                const map: Record<string, string> = {};
                countriesResult.value.forEach((country) => {
                    const id = country.country_id ?? country.id;
                    const name = country.country_name ?? country.name;
                    if (id !== undefined && id !== null) {
                        map[String(id)] = String(name ?? id);
                    }
                });
                setCountryNamesById(map);
            }
            // countries failing silently falls back to showing the raw country_id below

            setIsLoading(false);
        });
    }, [locationId]);

    const runSearch = async (value: string) => {
        setQuery(value);
        if (!value.trim()) {
            setResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const matches = await MasterDataApiService.searchSites(value);
            setResults(matches);
        } finally {
            setIsSearching(false);
        }
    };

    const handleLink = async (siteId: number) => {
        setIsLinking(true);
        try {
            const linked = await LocationApiService.linkSite(locationId, siteId);
            setSite(linked);
            setQuery("");
            setResults([]);
        } finally {
            setIsLinking(false);
        }
    };

    const handleUnlink = async () => {
        await LocationApiService.unlinkSite(locationId);
        setSite(null);
    };

    if (isLoading) {
        return <LoadingSpinner size="m" />;
    }

    if (loadError) {
        return <div className={styles.errorBanner}>Couldn't load the Site tab: {loadError}</div>;
    }

    const columns: DataTableColumn<SiteSummary>[] = [
        { key: "site_code", header: "Site Code" },
        { key: "site_name", header: "Site Name" },
        {
            key: "country_id",
            header: "Country",
            render: (value) => (value ? countryNamesById[String(value)] ?? String(value) : "—"),
        },
        {
            key: "site_id",
            header: "",
            render: () => (
                <Button size="em-c-btn--small" type="em-c-btn--secondary" label="Unlink" onClick={handleUnlink} />
            ),
        },
    ];

    return (
        <div className={styles.tabPanel}>
            <DataTable columns={columns} rows={site ? [site] : []} emptyMessage="No site linked to this location yet." />

            {!site && (
                <div className={styles.comboWrap}>
                    <EMORGTextInput
                        id="site-search"
                        label="Add an Existing Site — Search and Filter"
                        placeholder="Search by site name or code…"
                        value={query}
                        onChange={(newValue: unknown) =>
                            runSearch(typeof newValue === "string" ? newValue : String((newValue as any)?.target?.value ?? ""))
                        }
                    />
                    {isSearching && <LoadingSpinner size="s" />}
                    {results.length > 0 && (
                        <ul className={styles.comboList}>
                            {results.map((result) => {
                                const siteId = Number(result.site_id);
                                return (
                                    <li key={siteId}>
                                        <button
                                            type="button"
                                            className={styles.comboItem}
                                            disabled={isLinking}
                                            onClick={() => handleLink(siteId)}
                                        >
                                            {String(result.site_name)} <span>({String(result.site_code)})</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
