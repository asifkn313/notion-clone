// import { useRef } from "react";
import styles from "./Cover.module.css";
// import { FileImage } from "../components/FileImage";
// import { uploadImage } from "../utils/uploadImage";

export const Cover = () => {
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const onChangeCover = () => {
  //   fileInputRef.current?.click();
  // };

  // const onChangeCoverUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const target = event.target;
  // };

  return (
    <div className={styles.cover}>
      <img src="/notion-clone.png" alt="Cover" className={styles.image} />
      {/* <button className={styles.button} onClick={onChangeCover}>
        Change Cover
      </button> */}
      {/* <input
        onChange={onChangeCoverUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
      /> */}
    </div>
  );
};
