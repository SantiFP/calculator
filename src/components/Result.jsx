import classes from "./Result.module.css";

const Result = ({ number,operation }) => {
  return (
    <>
      <div className={classes.resultDiv}>
        <div className={`${classes.showResults} `}>
          <p style={{paddingRight:'1rem' ,paddingTop:'0.5rem'}}>{operation ? operation : 'operation will be shown here'}</p>
        </div>
        <div className={`${classes.resultFlex} `}>
          <p className={classes.result} style={{ paddingRight: "1rem" }}>{number ? number : 0}</p>
        </div>
      </div>
    </>
  );
};

export default Result;
