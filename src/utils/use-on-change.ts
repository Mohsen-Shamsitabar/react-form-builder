import * as React from "react";

const useOnChange = <T>(
  state: T,
  handleOnChange: (currentState: T) => void,
) => {
  const cachedOnChange = React.useRef(handleOnChange);

  React.useEffect(() => {
    cachedOnChange.current = handleOnChange;
  });

  React.useEffect(() => {
    cachedOnChange.current(state);
  }, [state]);
};

export default useOnChange;
