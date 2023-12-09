import "./styles.css";
import { useState } from "react";
import AspirinLogo from "../../assets/aspirin.jpg";
import Button from "../Button";
import { AiOutlineEdit } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";
import EditMedicine from "../../../pharmacist/scenes/EditMedicine";
import { useArchiveMedicineMutation, useUnarchiveMedicineMutation } from "../../../store";
const Accordion = ({
  label,
  subLabel,
  price,
  isPharmacist = false,
  quantity,
  medicinalUse,
  sales,
  status,
  image = AspirinLogo,
}) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = {
    price: price,
    name: label,
    description: subLabel,
    quantity: quantity,
    medicinalUse: medicinalUse,
    sales: sales,
  };

  const onClick = () => {
    setOpen(!open);
  };
  const [archiveMedicine, results1] = useArchiveMedicineMutation();
  const [unarchiveMedicine, results2] = useUnarchiveMedicineMutation();

  const archiveOnClick = async () => {
    const name = {
      medicineName: label,
    };
    await archiveMedicine(name);
    console.log("archive");
  };
  // console.log(expanded);
  // console.log('data' , data);
  const extension = Object.entries(data).map(([key, value], index) => {
    if (!isPharmacist && (key === "sales" || key === "quantity")) return null;
    return (
      <div key={index} className="accordion-entry">
        <span className="accordion-key">{key}</span>: {value}
      </div>
    );
  });
  let urlImage;
  if (image !== AspirinLogo) {
    const bytesImage = new Uint8Array(image.data.data);
    const blobImage = new Blob([bytesImage], { type: image.contentType });
    urlImage = URL.createObjectURL(blobImage);
  }

  const extraClass = status === "archived" ? "accordion-header-archived" : "";

  const className = `accordion ${open ? "open" : "closed"}`;
  return (
    <div className="accordion-container">
      <div className={className} onClick={onClick}>
        <div className="accordion-titles">
          <div className={`accordion-header ${extraClass}`}>
            {label} {status == "archived" ? " (Archived)" : ""}
          </div>
          <div className="accordion-subheader">{subLabel}</div>
        </div>
        <div className="accordion-price">{price}</div>
      </div>
      {open ? (
        <div className="accordion-extension">
          <div className="extension-header">Extra Information</div>
          <img
            className="accordion-image"
            src={urlImage ? urlImage : AspirinLogo}
            alt="Aspirin Logo"
          />
          {extension}
          {isPharmacist ? (
            <div className="accordion-button-container">
              <div className="accordion-button">
                <Button onClick={archiveOnClick} type="button">
                  <FaArchive size={20} color="#fff" />
                  Archive
                </Button>
              </div>
              <div className="accordion-button">
                <Button onClick={() => setEdit(true)} type="button">
                  <AiOutlineEdit size={20} color="#fff" />
                  Edit
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <></>
      )}
      {isPharmacist ? (
        <EditMedicine isOpen={edit} onClose={() => setEdit(false)} medicineDetails={data} />
      ) : null}
    </div>
  );
};

export default Accordion;
