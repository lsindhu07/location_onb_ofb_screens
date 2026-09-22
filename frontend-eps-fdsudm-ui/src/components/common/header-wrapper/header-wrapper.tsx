import { Footer, FooterItem, HorizontalHeader, Navigation, NavigationItem } from "@emorg-prd/standard-react";
import { useNavigate } from "@tanstack/react-router";
import type { NavItem } from "../../../models/nav-item";
import ThemeToggle from "@/providers/theme-provider/theme-toggle";
import styles from "./header-wrapper.module.css";
//import ThemeToggle from "../theme-provider/theme-toggle";

//import ThemeToggle from "./theme/theme-toggle";



export function HeaderWrapper({ navItems }: { navItems: NavItem[] }) {
    const navigate = useNavigate();

    return (
        <div style={{ gap: "1.5rem" }} className={styles.stickyHeader}>
            <HorizontalHeader color="em-c-header--blue" title="Fds Udm Ui" type="em-c-header--condensed">
                <Navigation>
                    {
                        navItems.map((item, index) => (
                            <NavigationItem
                                key={item.key}
                                label={item.label}
                                url={item.url}
                                onClick={() => navigate({ to: item.url })}
                            />
                        )
                        )
                    }
                </Navigation>

            </HorizontalHeader>
        </div>
    );
}

export function FooterWrapper(props: any) {
    return (
        <Footer
            condensed
            privacypolicy
            privacystatement
            type="only-policy-links"
        >
            <FooterItem
                url="https://corporate.exxonmobil.com/global-legal-pages/privacy-policy"
                value="Privacy Policy"
            />
        </Footer>
    )
}