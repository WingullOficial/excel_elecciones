import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import readXlsxFile from 'read-excel-file'
export default function AddExcelButton({ setExcelObject, excelObject }) {
  const [file, setFile] = useState([]);

  const handleChange = e => {
    setFile([...file, e.target.files[0]]);
  }

  useEffect(() => {
    if (file.length > 0) {
      readXlsxFile(file[0])
        .then(excelData => {
          setExcelObject(excelData);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [file]);

  return (
    <div>
      <input className="form-control AddExcelButton"
        type="file"
        onChange={handleChange} />
    </div>
  );
}
