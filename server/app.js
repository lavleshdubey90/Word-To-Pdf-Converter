require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const docxToPDF = require("docx-pdf");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;  // Port configuration

app.use(cors());

// Setting up the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);  // Corrected path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/convert-file", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        // Defining output file path
        const outputPath = path.join(__dirname, "files");
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        const outputFilePath = path.join(outputPath, `${req.file.originalname.replace(/\.[^/.]+$/, "")}.pdf`);
        
        docxToPDF(req.file.path, outputFilePath, (err, result) => {
            if (err) {
                console.error("Error converting docx to pdf:", err);
                return res.status(500).json({
                    message: "Error converting docx to pdf",
                });
            }

            res.download(outputFilePath, (downloadErr) => {
                if (downloadErr) {
                    console.error("Error downloading file:", downloadErr);
                    return res.status(500).json({
                        message: "Error downloading file",
                    });
                }

                console.log("File downloaded successfully");

                // Clean up uploaded and converted files
                fs.unlink(req.file.path, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Error deleting uploaded file:", unlinkErr);
                    }
                });

                fs.unlink(outputFilePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Error deleting converted file:", unlinkErr);
                    }
                });
            });
        });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
