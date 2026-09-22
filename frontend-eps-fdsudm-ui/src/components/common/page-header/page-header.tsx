import { Button } from "@emorg-prd/standard-react";
import { useNavigate } from "@tanstack/react-router";
import styles from "./page-header.module.css";

type PageHeaderWrapperProps = {
    title: string;
    subtitle?: string;
    buttonLabel?: string;
    /** Internal route to redirect to via the router; ignored when onButtonClick is provided. */
    buttonLink?: string;
    onButtonClick?: () => void;
};

export function PageHeaderWrapper({
    title,
    subtitle,
    buttonLabel,
    buttonLink,
    onButtonClick,
}: PageHeaderWrapperProps) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
            return;
        }
        if (buttonLink) {
            navigate({ to: buttonLink as any });
        }
    };

    return (
        <div className={styles.pageHeaderRow}>
            <div>
                <h3 className={styles["page-header-title"]}>{title}</h3>
                {subtitle && <p className={styles["page-header-desc"]}>{subtitle}</p>}
            </div>
            {buttonLabel && (
                <Button
                    type="em-c-btn--primary"
                    size="em-c-btn--small"
                    label={buttonLabel}
                    onClick={handleButtonClick}
                />
            )}
        </div>
    );
}
