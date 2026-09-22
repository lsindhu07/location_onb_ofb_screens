import { useEffect, useState } from "react";
import { Badge } from "@emorg-prd/standard-react";
import { useNavigate } from "@tanstack/react-router";
import { DataTable, type DataTableColumn } from "@/components/common/data-table/data-table";
import { LoadingSpinner } from "@/components/common/loading-spinner/loading-spinner";
import { PageHeaderWrapper } from "@/components/common/page-header/page-header";
import { LocationApiService } from "@/services/location-api.service";
import { MasterDataApiService, type LookupRecord } from "@/services/master-data-api.service";
import type { LocationRecord } from "@/models/api/location-dto";
import { SearchAndFilter, type FilterOption, type LocationFilterValues } from "./search-and-filter";

const locationColumns: DataTableColumn<LocationRecord>[] = [
    { key: "location_id", header: "Location ID" },
    { key: "location_name", header: "Name" },
    { key: "location_street_address_1", header: "Address 1" },
    {key: "location_city", header: "City" },
    { key: "business_line_id", header: "Business line" },
    { key: "location_desc", header: "Desc" },
    {
        key: "status",
        header: "Status",
        render: (value) => (
            <Badge
                type={value === "Active" ? "em-c-badge--positive" : "em-c-badge--negative"}
                text={String(value)}
            />
        ),
    },
];

export function LocationList() {
    const navigate = useNavigate();
    const [locationRows, setLocationRows] = useState<LocationRecord[]>([]);
    const [countryOptions, setCountryOptions] = useState<FilterOption[]>([]);
    const [cityOptions, setCityOptions] = useState<FilterOption[]>([]);
    const [siteOptions, setSiteOptions] = useState<FilterOption[]>([]);
    const [zoneOptions, setZoneOptions] = useState<FilterOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            LocationApiService.getLocationList(),
            MasterDataApiService.getCountries(),
            MasterDataApiService.getZones(),
        ]).then(([rows, countries, zones]) => {
            setLocationRows(rows);
            setCountryOptions(toOptions(countries, ["country_id", "id"], ["country_name", "name"]));
            setZoneOptions(toOptions(zones, ["enterprise_sub_zone_id"], ["enterprise_sub_zone_name"]));
            setIsLoading(false);
        });
    }, []);

    const getFieldValue = (row: LocationRecord, keys: string[]) => {
        const record = row as unknown as Record<string, unknown>;
        const value = keys.map((key) => record[key]).find((candidate) => candidate !== undefined && candidate !== null);
        return String(value ?? "");
    };

    const optionsFor = (keys: string[]): FilterOption[] => Array.from(new Set(
        locationRows.map((row) => getFieldValue(row, keys)).filter(Boolean),
    )).sort().map((value) => ({ label: value, value }));

    const toOptions = (records: LookupRecord[], valueKeys: string[], labelKeys: string[]): FilterOption[] => records
        .map((record) => {
            const value = valueKeys.map((key) => record[key]).find(Boolean);
            const label = labelKeys.map((key) => record[key]).find(Boolean) ?? value;
            return value === undefined ? undefined : { value: String(value), label: String(label) };
        })
        .filter((option): option is FilterOption => option !== undefined);

    const loadCountryDependencies = async (countryId: string) => {
        setCityOptions([]);
        setSiteOptions([]);

        if (!countryId) {
            return;
        }

        const [cities, sites] = await Promise.all([
            MasterDataApiService.getCitiesByCountry(countryId),
            MasterDataApiService.getSitesByCountry(countryId),
        ]);

        setCityOptions(toOptions(cities, ["country_subdivision_id", "id"], ["subdivision_name", "name", "city_name"]));
        setSiteOptions(toOptions(sites, ["site_id", "id"], ["site_name", "name"]));
    };

    const loadCountriesByZone = async (zoneId: string) => {
        setCityOptions([]);
        setSiteOptions([]);

        const countries = zoneId
            ? await MasterDataApiService.getCountriesByZone(zoneId)
            : await MasterDataApiService.getCountries();

        setCountryOptions(toOptions(countries, ["country_id", "id"], ["country_name", "name"]));
    };

    const searchLocations = async (values: LocationFilterValues) => {
        setIsLoading(true);

        try {
            const hasFilters = Object.values(values).some(Boolean);
            const rows = hasFilters
                ? await LocationApiService.searchLocations({
                    name: values.name,
                    streetAddress1: values.streetAddress,
                    city: values.city,
                    operationStatusId: values.status,
                    countrySubdivisionId: values.zone,
                    country: values.country,
                    siteId: values.site,
                    isRealFlag: values.isReal,
                })
                : await LocationApiService.getLocationList();

            setLocationRows(rows);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: "grid", width: "100%", gap: "1.5rem" }}>
            <PageHeaderWrapper
                title="Location Management"
                subtitle="View and manage all business locations."
                buttonLabel="Add Location"
                buttonLink="/location/create"
            />
            <SearchAndFilter
                zoneOptions={zoneOptions}
                countryOptions={countryOptions}
                siteOptions={siteOptions}
                cityOptions={cityOptions}
                statusOptions={optionsFor(["status"])}
                onZoneChange={loadCountriesByZone}
                onCountryChange={loadCountryDependencies}
                onSearch={searchLocations}
            />
            {isLoading ? (
                <LoadingSpinner size="m" />
            ) : (
                <DataTable
                    columns={locationColumns}
                    rows={locationRows}
                    tableType="em-c-table--condensed"
                    optionalClass="em-dc-table_object"
                    hasPagination
                    rowsPerPage={10}
                    onRowClick={(row) => navigate({ to: "/location/$locationId", params: { locationId: row.location_id } })}
                />
            )}
        </div>
    );
}