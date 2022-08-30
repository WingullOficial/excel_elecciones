import { useEffect, useState } from 'react';
import './App.css';
import AddExcelButton from './components/AddExcelButton';
import BoostrapStyles from './components/BoostrapStyles';
import DaysInput from './components/DaysInput';
import ListOfSupportedFormats from './components/ListOfSupportedFormats';
import RenderListOfArrays from './components/RenderListOfArrays';

function App() {

  const [excelObject, setExcelObject] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(90);
  useEffect(() => {
    console.log('excelObject', excelObject);
  } , [excelObject]);

  return (
    <div className="App">
      <BoostrapStyles></BoostrapStyles>
      <header>
      <ListOfSupportedFormats></ListOfSupportedFormats>
      <AddExcelButton excelObject={excelObject} setExcelObject={setExcelObject}></AddExcelButton>
      <DaysInput setNumberOfDays={setNumberOfDays} numberOfDays={numberOfDays}></DaysInput>
      </header>
      {excelObject && <RenderListOfArrays numberOfDays={numberOfDays} list={excelObject}></RenderListOfArrays>}

    </div>
  );
}

export default App;
