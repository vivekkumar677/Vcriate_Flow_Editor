import { useResizeDetector } from 'react-resize-detector';

const FlowWrapper = ({ children }) => {
  const { width, height, ref } = useResizeDetector();

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {width && height ? children : null}
    </div>
  );
};

export default FlowWrapper;