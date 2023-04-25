import { useState } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';
import TextField from '../TextField/TextField';
// import FilePicker from '../../Form/Input/FilePicker';
import Image from '../Image/Image';
import { required, length } from '../../utils/validators';
import { useInput } from '../../hooks/useInput';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ChangeEvent } from 'react';

import { generateBase64FromImage } from '../../utils/image';

const POST_FORM = {
  // title: {
  //   value: '',
  //   valid: false,
  //   touched: false,
  //   validators: [required, length({ min: 5 })]
  // },
  image: {
    value: '',
    valid: false,
    touched: false,
    validators: [required]
  },
  // content: {
  //   value: '',
  //   valid: false,
  //   touched: false,
  //   validators: [required, length({ min: 5 })]
  // }
};

type FeedEditProps = {
  editing: boolean;
  selectedPost: unknown;
  onCancelEdit: () => void;
};

// state = {
//   postForm: POST_FORM,
//   formIsValid: false,
//   imagePreview: null
// };

function FeedEdit(props: FeedEditProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { input: titleState, changeHandler: onTitleChange, blurHandler: onTitleBlur } = useInput([required, length({ min: 5 })]);
  const { input: contentState, changeHandler: onContentChange, blurHandler: onContentBlur } = useInput([required, length({ min: 5 })]);
  const { input: imageState, changeHandler: onImageChange, blurHandler: onImageBlur } = useInput([required]);

  const formIsValid = useFormValidation([titleState.valid, contentState.valid]);

  const cancelPostChangeHandler = () => props.onCancelEdit();
  const acceptPostChangeHandler = () => console.log('state-change');

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      generateBase64FromImage(e.target.files[0])
        .then((b64: string) => {
          setImagePreview(b64);
        })
        .catch(e => {
          setImagePreview(null);
        });

      onImageChange(e);
    }
  };

  return props.editing ? (
    <>
      <Backdrop onClick={cancelPostChangeHandler} open={props.editing} />
      <Modal
        title="New Post"
        acceptEnabled={formIsValid}
        onCancel={cancelPostChangeHandler}
        onAccept={acceptPostChangeHandler}
        isLoading={false}
      >
        <form>
          <TextField
            id="title"
            label="Title"
            valid={titleState.valid}
            touched={titleState.touched}>
            <input
              type="text"
              required={true}
              onChange={onTitleChange}
              onBlur={onTitleBlur}
              value={titleState.value}
            />

          </TextField>
          <TextField
            id="image"
            label="Image"
            valid={imageState.valid}
            touched={imageState.touched}>
            <input
              type="file"
              onChange={fileHandler}
              onBlur={onImageBlur}
            />
          </TextField>
          {/* <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'image')}
              valid={this.state.postForm['image'].valid}
              touched={this.state.postForm['image'].touched}
            /> */}
          <div className="new-post__preview-image">
            {!imagePreview && <p>Please choose an image.</p>}
            {imagePreview && (
              <Image imageUrl={imagePreview} contain left />
            )}
          </div>
          <TextField
            id="content"
            label="Content"
            valid={contentState.valid}
            touched={contentState.touched}
          >
            <textarea
              rows={5}
              onChange={onContentChange}
              onBlur={onContentBlur}
              value={contentState.value}
            />
          </TextField>
        </form>
      </Modal>
    </>
  ) : null;
  // }
}

export default FeedEdit;


  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.props.editing &&
  //     prevProps.editing !== this.props.editing &&
  //     prevProps.selectedPost !== this.props.selectedPost
  //   ) {
  //     const postForm = {
  //       title: {
  //         ...prevState.postForm.title,
  //         value: this.props.selectedPost.title,
  //         valid: true
  //       },
  //       image: {
  //         ...prevState.postForm.image,
  //         value: this.props.selectedPost.imagePath,
  //         valid: true
  //       },
  //       content: {
  //         ...prevState.postForm.content,
  //         value: this.props.selectedPost.content,
  //         valid: true
  //       }
  //     };
  //     this.setState({ postForm: postForm, formIsValid: true });
  //   }
  // }

  // postInputChangeHandler = (input, value, files) => {
  //   if (files) {
  //     generateBase64FromImage(files[0])
  //       .then(b64 => {
  //         this.setState({ imagePreview: b64 });
  //       })
  //       .catch(e => {
  //         this.setState({ imagePreview: null });
  //       });
  //   }
  //   this.setState(prevState => {
  //     let isValid = true;
  //     for (const validator of prevState.postForm[input].validators) {
  //       isValid = isValid && validator(value);
  //     }
  //     const updatedForm = {
  //       ...prevState.postForm,
  //       [input]: {
  //         ...prevState.postForm[input],
  //         valid: isValid,
  //         value: files ? files[0] : value
  //       }
  //     };
  //     let formIsValid = true;
  //     for (const inputName in updatedForm) {
  //       formIsValid = formIsValid && updatedForm[inputName].valid;
  //     }
  //     return {
  //       postForm: updatedForm,
  //       formIsValid: formIsValid
  //     };
  //   });
  // };

  // cancelPostChangeHandler = () => {
  //   this.setState({
  //     postForm: POST_FORM,
  //     formIsValid: false
  //   });
  //   this.props.onCancelEdit();
  // };

  // acceptPostChangeHandler = () => {
  //   const post = {
  //     title: this.state.postForm.title.value,
  //     image: this.state.postForm.image.value,
  //     content: this.state.postForm.content.value
  //   };
  //   this.props.onFinishEdit(post);
  //   this.setState({
  //     postForm: POST_FORM,
  //     formIsValid: false,
  //     imagePreview: null
  //   });
  // };