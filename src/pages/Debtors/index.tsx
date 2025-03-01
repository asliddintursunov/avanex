import { useTranslation } from "react-i18next";

function Debtors() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{t("menus.debtors")}</h1>
    </div>
  );
}

export default Debtors;
