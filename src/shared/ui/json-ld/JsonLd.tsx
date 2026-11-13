type TJsonLdProps = {
  data: Record<string, unknown>;
};

export const JsonLd = ({ data }: TJsonLdProps) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
