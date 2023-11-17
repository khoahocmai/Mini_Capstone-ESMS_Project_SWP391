import instance from "@/utils/instance";
import { Button } from "antd";
import { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import * as St from "./ExcelFile.styled";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import configs from "@/configs";
import toast, { Toaster } from "react-hot-toast";

// import * as XLSX from "xlsx";

function ExcelFile({ setImportOpen, fetchData, setLoadingUpload, loadingUpload }) {
    const [file, setFile] = useState();
    const [fileLabel, setFileLabel] = useState("Import File");
    // const navigate = useNavigate();

    const upload = () => {
        setLoadingUpload(true);
        const formData = new FormData();
        formData.append("excelFile", file);
        instance
            .post("studentSubjects/excel", formData)
            .then(() => {
                toast.success("Import success!");
                // console.log(res);
                setImportOpen(false);
                setLoadingUpload(false);
                fetchData();
                // navigate(configs.routes.adminCourses);
            })
            .catch((error) => {
                toast.error("Import failed!");
                setLoadingUpload(false);
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        setFileLabel(e.target.files[0].name);
    };

    return (
        <St.DivStyled>
            <Toaster position="top-right" reverseOrder={false} />
            {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
            {/* <Button className="download" onClick={handleDownload}>
                <DownloadOutlined />
                Download
            </Button> */}
            <input
                accept=".xlsx"
                id="upload"
                type="file"
                onChange={handleChange}
            />
            <label className="input" htmlFor="upload">
                {fileLabel}
            </label>
            {/* <Button className="upload" onClick={upload}>
                Upload
            </Button> */}
            {file && (
                <Button loading={loadingUpload} className="upload" onClick={upload}>
                    Upload
                </Button>
            )}
        </St.DivStyled>
    );
}

ExcelFile.propTypes = {
    setImportOpen: PropTypes.func,
    fetchData: PropTypes.func,
    setLoadingUpload: PropTypes.func,
    loadingUpload: PropTypes.bool,
};

export const DownloadExcel = () => {
    const formFile = "/src/assets/fileExcel/test.xlsx";

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = formFile;
        link.download = "test.xlsx";
        link.click();
    };

    return (
        <Button
            style={{ marginLeft: 10 }}
            className="download"
            onClick={handleDownload}
        >
            <DownloadOutlined />
            Download Template
        </Button>
    );
};

export default ExcelFile;
