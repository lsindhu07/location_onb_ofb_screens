import { Tab, TabItem } from "@emorg-prd/standard-react";
import type { LocationRecord } from "@/models/api/location-dto";
import { SiteTab } from "./site-tab";
import { LocationDetailsTab } from "./location-details-tab";
import styles from "./location-record.module.css";

type LocationRecordTabsProps = {
    locationId: string;
    location: LocationRecord;
    onLocationSaved: (updated: LocationRecord) => void;
};

// Order matches the agreed HTML wireframe (html-prototype2_3_1.html #manage-location):
// Site, Location Details, Building, Parcel, Accounting. Only Site and Location
// Details are wired up for now — Building/Parcel/Accounting are stubbed so the
// tab bar (and the em-c-tabs--underline styling) is already in place for when
// those are built out.
export function LocationRecordTabs({ locationId, location, onLocationSaved }: LocationRecordTabsProps) {
    return (
        <Tab type="em-c-tabs--underline">
            <TabItem title="Site">
                <SiteTab locationId={locationId} />
            </TabItem>
            <TabItem title="Location Details">
                <LocationDetailsTab locationId={locationId} location={location} onSaved={onLocationSaved} />
            </TabItem>
            <TabItem title="Building">
                <div className={styles.stubPanel}>Building tab — coming soon.</div>
            </TabItem>
            <TabItem title="Parcel">
                <div className={styles.stubPanel}>Parcel tab — coming soon.</div>
            </TabItem>
            <TabItem title="Accounting">
                <div className={styles.stubPanel}>Accounting tab — coming soon.</div>
            </TabItem>
        </Tab>
    );
}
