import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Form, useSubmit } from 'react-router-dom';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';
import TextField from '../TextField/TextField';
import Image from '../Image/Image';
import { required, length } from '../../utils/validators';
import { useInput } from '../../hooks/useInput';
import { useFileInput } from '../../hooks/useFileInput';
import { useFormValidation } from '../../hooks/useFormValidation';
import { generateBase64FromImage } from '../../utils/image';

type FeedEditProps = {
  editing: boolean;
  selectedPost: unknown;
  onCancelEdit: () => void;
};

function FeedEdit(props: FeedEditProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { input: titleState, changeHandler: onTitleChange, blurHandler: onTitleBlur, resetHandler: titleReset } = useInput([required, length({ min: 5 })]);
  const { input: contentState, changeHandler: onContentChange, blurHandler: onContentBlur, resetHandler: contentReset } = useInput([required, length({ min: 5 })]);
  const { input: imageState, changeHandler: onImageChange, fileHandler, blurHandler: onImageBlur, resetHandler: imageReset } = useFileInput([required]);

  useEffect(() => {
    if (props.editing) {
      titleReset();
      contentReset();
      imageReset();
      setImagePreview(null);
    }
  }, [props.editing]);

  const submit = useSubmit();
  const formElement = useRef<HTMLFormElement | null>(null);
  const formIsValid = useFormValidation([titleState.valid, contentState.valid, imageState.valid]);

  const cancelPostChangeHandler = () => props.onCancelEdit();
  const acceptPostChangeHandler = () => {
    if (formElement.current instanceof HTMLFormElement) {
      submit(formElement.current, {
        method: "POST"
      });

      props.onCancelEdit();
    };
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      generateBase64FromImage(e.target.files[0])
        .then((b64: string) => {
          setImagePreview(b64);
        })
        .catch(e => {
          setImagePreview(null);
        });

      onImageChange(e);
      fileHandler(e);
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
        <Form ref={formElement} encType="multipart/form-data">
          <TextField
            id="title"
            label="Title"
            valid={titleState.valid}
            touched={titleState.touched}>
            <input
              type="text"
              name="title"
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
              name="image"
              onChange={onFileChange}
              onBlur={onImageBlur}
            />
          </TextField>
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
              name="content"
              onChange={onContentChange}
              onBlur={onContentBlur}
              value={contentState.value}
            />
          </TextField>
        </Form>
      </Modal>
    </>
  ) : null;
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