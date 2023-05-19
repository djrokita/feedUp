import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Form, useSubmit, useSearchParams, generatePath, redirect } from 'react-router-dom';

import TextField from '../TextField/TextField';
import Image from '../Image/Image';
import { required, length } from '../../utils/validators';
import { useInput } from '../../hooks/useInput';
import { useFileInput } from '../../hooks/useFileInput';
import { useFormValidation } from '../../hooks/useFormValidation';
import { TPost } from '../../types';
import Button from '../Button/Button';
import { buttonStyles } from '../../utils/buttonStyles';
import { retrieveToken } from '../../utils/auth';

type FeedEditProps = {
    // editing: boolean;
    selectedPost?: TPost | null;
    // onCancelEdit: () => void;
};

function FeedEdit({ selectedPost = null }: FeedEditProps) {
    const { input: titleState, changeHandler: onTitleChange, blurHandler: onTitleBlur, uploadHandler: onTitleUpload, resetHandler: titleReset } = useInput([required, length({ min: 5 })]);
    const { input: contentState, changeHandler: onContentChange, blurHandler: onContentBlur, uploadHandler: onContentUpload, resetHandler: contentReset } = useInput([required, length({ min: 5 })]);
    const { input: imageState, changeHandler: onImageChange, fileHandler, uploadHandler: onImageUpload, previewHandler, blurHandler: onImageBlur, resetHandler: imageReset } = useFileInput([required]);

    const method = selectedPost ? 'PUT' : 'POST';

    useEffect(() => {
        if (selectedPost) {
            onTitleUpload(selectedPost.title);
            onContentUpload(selectedPost.content);
            onImageUpload(selectedPost.imageUrl);
        }

    }, []);

    // const submit = useSubmit();
    const [params, setParams] = useSearchParams();
    const formElement = useRef<HTMLFormElement | null>(null);
    const formIsValid = useFormValidation([titleState.valid, contentState.valid, imageState.valid]);

    // const acceptPostChangeHandler = () => {
    //     if (formElement.current instanceof HTMLFormElement) {
    //         if (selectedPost) {
    //             submit(formElement.current, {
    //                 method: "PUT",
    //                 // action: path
    //             });
    //             // setParams({ id: selectedPost._id });

    //         } else {
    //             submit(formElement.current, {
    //                 method: "POST",
    //             });
    //         }

    //         // onCancelEdit();
    //     };
    // };

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onImageChange(e);
            fileHandler(e);
            await previewHandler(e);
        }
    };


    return (
        <Form method={method} encType="multipart/form-data">
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
                {!imageState.imagePreview && !selectedPost && <p>Please choose an image.</p>}
                {imageState.imagePreview && (
                    <Image imageUrl={imageState.imagePreview} contain left />
                )}
                {!imageState.imagePreview && selectedPost?.imageUrl && (
                    <Image imageUrl={'http://localhost:8080/' + selectedPost.imageUrl} contain left />
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
            <div className="modal__actions">
                {/* <Button btnStyles={buttonStyles("info", "flat")} onClick={() => null} text='Go to Feed' /> */}
                <Button btnStyles={buttonStyles("raised")}
                    text="Accept"
                    // onClick={() => null}
                    disabled={false}
                    loading={false}
                />
            </div>
        </Form>
    );
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
  // };;