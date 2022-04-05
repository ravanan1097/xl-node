const Person = require("../models/person");
const fs = require("fs");
const readxl = require("read-excel-file/node");
const path = require("path");
const excel = require("exceljs");
require('dotenv').config();

exports.uploadFile = async (req, res) => {
    try {
        if (req.file == undefined)
            return res.json("Please Upload Excel File").status(400);

        let path = process.env.ASSET_PATH + req.file.filename;

        let rows = await readxl(path);
        var persons = [];
        rows.shift();
        rows.forEach(row => {
            let person = {
                firstName: row[0],
                lastName: row[1],
                gender: row[2],
                country: row[3],
                age: row[4],
                date: row[5]
            };
            persons.push(person);
        });

        let persondb = await Person.bulkCreate(persons);

        if (persondb) return res.json("Excel Uploaded Successfully" + req.file.filename).status(200);
        else return res.json.status(500).json("Excel Upload Failed");

    } catch (error) {
        console.log(error);
        res.json(error.message).status(500);
    }
    finally {
        const filepath = path.format({ dir: "/home/fasoftwares/Videos/node/assets/excel", base: req.file.filename });
        fs.unlink(filepath, (err) => {
            if (err) throw err;
            console.log("Filed Deleted Successfully");
        })
    }
};

exports.excelData = async (req, res) => {
    try {
        let data = await Person.findAll();
        if (data) return res.json(data);
        else return res.json("Error occured while fetching data");

    } catch (error) {
        console.log(error);
        return res.json(error.message).status(500);
    }
};

exports.xlDownload = async (req, res) => {

    try {
        let data = await Person.findAll();
        let obj = [];
        data.forEach(row => {
            obj.push({
                firstName: row.firstName,
                lastName: row.lastName,
                gender: row.gender,
                country: row.country,
                age: row.age,
                date: row.date
            })
        });
        console.log(data);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("person");
        worksheet.columns = [
            { header: "First Name", key: "firstName" },
            { header: "Last Name", key: "lastName" },
            { header: "Gender", key: "gender" },
            { header: "Country", key: "country" },
            { header: "Age", key: "age" },
            { header: "Date", key: "date" },
        ];
        worksheet.addRows(obj);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + `person_${Date.now()}.xlsx`
        );

        return workbook.xlsx.write(res);

    } catch (error) {
        console.log(e);
        return res.json(e.message).status(500);
    }
};