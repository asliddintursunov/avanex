import ParentModal from "../ParentModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function BusinessPartnersModal({ isOpen, onClose }: Props) {
  return (
    <ParentModal
      body={<></>}
      headerContent=""
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    />
  );
}

export default BusinessPartnersModal;
