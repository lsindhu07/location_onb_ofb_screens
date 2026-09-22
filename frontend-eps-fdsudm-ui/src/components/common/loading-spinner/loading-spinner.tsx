import { LoadingIndicator } from "@emorg-prd/standard-react";
import styles from "./loading-spinner.module.css";

type LoadingSpinnerProps = {
    size?: "xl" | "l" | "m" | "s";
};

export function LoadingSpinner({ size = "m" }: LoadingSpinnerProps) {
    return (
        <div className={styles.loaderWrapper}>
            <LoadingIndicator size={size} />
        </div>
    );
}
