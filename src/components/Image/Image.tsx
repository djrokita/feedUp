import './Image.css';

type ImageProps = {
  imageUrl: string;
  contain?: boolean;
  left?: boolean;
};

function Image(props: ImageProps) {
  return (
    <div
      className="image"
      style={{
        backgroundImage: `url('${props.imageUrl}')`,
        backgroundSize: props.contain ? 'contain' : 'cover',
        backgroundPosition: props.left ? 'left' : 'center'
      }}
    />
  );
}

export default Image;
