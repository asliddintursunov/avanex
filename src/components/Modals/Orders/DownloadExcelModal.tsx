import { useTranslation } from "react-i18next";
import ParentModal from "../ParentModal";
import DateInput from "../../Input/DateInput";
import { Dispatch, SetStateAction } from "react";

type Props = {
  ModalFooter: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  startDate: string;
  endDate: string;
};

export default function DownloadExcelModal({
  ModalFooter,
  isOpen,
  onClose,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: Props) {
  const { t } = useTranslation();

  const ModalBody = (): JSX.Element => {
    return (
      <div className="flex flex-col gap-4">
        <DateInput
          label={t("labels.start_date")}
          value={startDate}
          setValue={setStartDate}
        />
        <DateInput
          label={t("labels.end_date")}
          value={endDate}
          setValue={setEndDate}
        />
      </div>
    );
  };

  return (
    <ParentModal
      headerContent={t("labels.choose_date_range")}
      body={<ModalBody />}
      footer={ModalFooter}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    />
  );
}
