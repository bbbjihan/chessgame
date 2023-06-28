export const flex = (direction:string,justifyContent:string) => {
  return`
    display: flex;
    flex-direction:${direction};
    justify-content:${justifyContent};
  `
}

export const alignCenter = () => {
  return`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
}

export const size = (height:string = ``, width:string = ``) => {
  return`
  ${height ? `height: ${height};` : ``}
  ${width ? `width: ${width};` : ``}
  `
}

export const responsive = (Size:string) => {
  if(Size === 'small'){
      return `@media (max-width: ${breakpoints[Size]})`;
  }else if(Size === 'medium'){
      return `@media (min-width: ${breakpoints['small']}) and (max-width: ${breakpoints[Size]})`
  }else if(Size === 'large'){
      return `@media (min-width: ${breakpoints['medium']})`;
  }
}

const breakpoints = {
  small: "576px",
  medium: "821px",
  large: "1440px",
};