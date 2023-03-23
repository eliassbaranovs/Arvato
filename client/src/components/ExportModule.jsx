import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import { exportUserData } from "../features/users/usersSlice";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

function ExportModule(props) {
  const dispatch = useDispatch();
  const member = props.member;
  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = await dispatch(exportUserData(member._id));

    const excelData = [userData.payload.user, ...userData.payload.resources];

    if (userData) {
      const fileName = "export_" + member.name;
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center" onClick={onSubmit}>
        <Button className="rounded-none" variant="text" type="button">
          Export Data
        </Button>
      </div>
    </>
  );
}

export default ExportModule;
