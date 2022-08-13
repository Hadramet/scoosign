import SignaturePad from "react-signature-pad-wrapper";

export const ScooSignaturePad = (props) => {
  const { padRef, ...others } = props;
  return <SignaturePad {...others} ref={padRef} redrawOnResize />;
};
