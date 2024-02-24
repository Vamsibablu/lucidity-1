import "./App.css";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import StatsTableFunc from "./components/StatsTable";
const useStyles = makeStyles({
  navBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "12px",
  },
  item: {
    padding: "30px",
    background: "lightgreen",
    borderRadius: "5px",
  },
});

function App() {
  const [isUser, setIsUser] = useState(true);
  const [statsData, setStatsData] = useState([]);
  const [statsObj, setStatsObj] = useState({
    productsCount: 0,
    storeValue: 0,
    outOfStock: 0,
    category: 0,
  });
  const [disabledList, setDisabledList] = useState([]);
  const toggleButton = () => {
    setIsUser(!isUser);
  };
  const classes = useStyles();

  const getTableData = async () => {
    const res = await fetch(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    const data = await res.json();
    setStatsData(data);
  };
  useEffect(() => {
    getTableData();
  }, []);
  const handleDisable = (row) => {
    const tempStatsData = [...statsData];
    let reqIndex;
    tempStatsData.forEach((item, i) => {
      if (item.name === row.name) {
        reqIndex = i;
      }
    });
    tempStatsData.splice(reqIndex, 1, {
      ...tempStatsData[reqIndex],
      isDisabled: !tempStatsData[reqIndex].isDisabled,
    });
    setStatsData(tempStatsData);
  };
  const getValue = () => {
    let productsCount = 0;
    statsData.forEach((item) => {
      if (!item.isDisabled) {
        productsCount += 1;
      }
    });
    let storeValue = 0;
    statsData.forEach((item) => {
      if (!item.isDisabled) {
        storeValue += +item.value.replace("$", "");
      }
    });
    let outOfStock = 0;
    statsData.forEach((item) => {
      if (!item.isDisabled && item.quantity == 0) {
        outOfStock += 1;
      }
    });
    let category = {};
    statsData.forEach((item) => {
      if (!item.isDisabled) {
        if (category[item.category]) {
          category[item.category] += 1;
        } else {
          category[item.category] = 1;
        }
      }
    });
    category = Object.keys(category).length;
    setStatsObj({ productsCount, storeValue, outOfStock, category });
  };
  useEffect(() => {
    getValue();
  }, [statsData]);
  const handleDelete = (row) => {
    const tempStats = statsData.filter((item) => item.name !== row.name);
    setStatsData(tempStats);
  };
  const handleChangeRow = (element, name) => {
    const tempStatsData = [...statsData];
    let reqIndex;
    tempStatsData.forEach((item, i) => {
      if (item.name === name) {
        reqIndex = i;
      }
    });
    tempStatsData.splice(reqIndex, 1, {
      ...tempStatsData[reqIndex],
      ...element,
    });
    setStatsData(tempStatsData);
  };

  return (
    <div className="App">
      <div className={classes.navBar}>
        <h5>admin</h5>
        <Switch
          checked={isUser}
          onChange={toggleButton}
          inputProps={{ "aria-label": "controlled" }}
        />
        <div>
          <h5>user</h5>
        </div>
      </div>
      <div>
        <h2 style={{ color: "white", textAlign: "left", marginLeft: "1rem" }}>
          Inventory Stats
        </h2>
        <Grid container style={{ gap: 15, justifyContent: "center" }}>
          {Object.entries(statsObj).map(([key, value]) => {
            return (
              <Grid item xs={2.85} className={classes.item}>
                {key} - {value}
              </Grid>
            );
          })}
        </Grid>
        <StatsTableFunc
          statsData={statsData}
          isUser={isUser}
          handleDelete={handleDelete}
          handleChangeRow={handleChangeRow}
          handleDisable={handleDisable}
        />
      </div>
    </div>
  );
}

export default App;
