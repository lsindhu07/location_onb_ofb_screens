
import styles from "./home.module.css";
import backgroundImage from "@/assets/background.png";
import { useNavigate } from "@tanstack/react-router";
import { Badge, Button, Icon, SimpleCard, TextLink } from "@emorg-prd/standard-react";
import content from "@/locales/en.json";

const { common, home } = content;

export function Home() {
  const navigate = useNavigate();

  const modules = home.modulesSection.modules.map((module) =>
    module.headline === "Location"
      ? { ...module, onClick: () => navigate({ to: "/location" }) }
      : module
  );

  const requestLinks = home.quickLinksSection.requestForms.links;

  const favouriteLinks = home.quickLinksSection.favourites.links;

  return (
    <div className={styles.content}>
      <section
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(0 24 72 / 80%), rgb(0 24 72 / 44%)), url(${backgroundImage})`,
        }}
      >
        <div className={styles.heroHeader}>
          <div className={styles.brandMark}>{home.brand.code}</div>
          <div className={styles.brandTitle}>
            <strong>{home.brand.title}</strong>
            <span>{home.brand.subtitle}</span>
          </div>
          <div className={styles.heroActions}>
            <Button
              label={home.hero.changeRequestButton}
              typeAttribute="button"
              optionalClass={styles.changeRequestButton}
            />
            <div className={styles.userIdentity}>
              <span className={styles.avatar}>AS</span>
              <span>A. Stern</span>
            </div>
          </div>
        </div>
        <div className={styles.heroCopy}>
          <h1>{home.hero.heading}</h1>
          <p>
            {home.hero.description}
          </p>
          <Button
            label={home.hero.documentationButton}
            typeAttribute="button"
            optionalClass={styles.documentationButton}
          />
        </div>
      </section>
      <div className={styles.homeBody}>
        <section className={styles.sectionCard}>
          <div className={styles.modules}>
            {modules.map((module) => (
              <SimpleCard
                key={module.headline}
                raised
                optionalClass={styles.moduleCard}
                headline={module.headline}
                description={module.description}
                bottomActions
              >
                <Button
                  label={common.buttons.openModule}
                  typeAttribute="button"
                  optionalClass={styles.moduleButton}
                  type="em-c-btn--primary"
                  onClick={"onClick" in module ? module.onClick : undefined}
                />
              </SimpleCard>
            ))}
          </div>
        </section>
        <section className={styles.sectionCard}>
          <h2>{home.quickLinksSection.title}</h2>
          <div className={styles.quickLinks}>
            <div className={styles.quickLinksColumn}>
              <h4>{home.quickLinksSection.requestForms.title}</h4>
              <div className={styles.quickLinkList}>
                {requestLinks.map((link) => (
                  <div className={styles.quickLink} key={link.label}>
                    <div className={styles.quickLinkContent}>
                      <Icon name={link.icon as any} size="em-c-icon--small" />
                      <TextLink url={link.url}>{link.label}</TextLink>
                    </div>
                    {"badge" in link && <Badge text={common.badges.comingSoon} />}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.quickLinksColumn}>
              <h4>{home.quickLinksSection.favourites.title}</h4>
              <div className={styles.quickLinkList}>
                {favouriteLinks.map((link) => (
                  <div className={styles.quickLink} key={link.label}>
                    <div className={styles.quickLinkContent}>
                      <Icon name="star-filled" size="em-c-icon--small" />
                      <TextLink url={link.url}>{link.label}</TextLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}