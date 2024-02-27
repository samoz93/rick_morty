import cls from "./loader.line.module.scss";
export const LoaderLine = ({ hidden }: { hidden?: boolean }) => {
  const classes = [cls.loader_line];
  if (hidden) {
    classes.push(cls.hidden);
  }
  return <div className={classes.join(" ")}></div>;
};
