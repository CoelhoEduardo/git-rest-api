import classes from "./Card.module.css";
import { ReactNode } from "react";

interface CardProps {
  title: string | ReactNode;
  subtitle?: string;
  fv_btn?: ReactNode;
  card_body?: ReactNode;
  footer_element?: ReactNode;
  hasContributors?: boolean;
  contributors?: ReactNode;
}
export const Card = ({
  title,
  subtitle,
  card_body,
  footer_element,
  fv_btn,
  hasContributors,
  contributors,
}: CardProps) => {
  return (
    <div className={classes.card}>
      <div className={classes.card_header}>
        <div className={classes.fv_button}>{fv_btn}</div>
        {title}
        <p>{subtitle}</p>
      </div>
      {card_body && <div>{card_body}</div>}
      <div className={classes.card_footer}>{footer_element}</div>
      {hasContributors && (
        <div>
          <div className={classes.card_divider} />
          {contributors}
        </div>
      )}
    </div>
  );
};
