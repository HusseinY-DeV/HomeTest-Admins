import React , {useEffect,useState} from 'react'
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { Button, TextField } from '@material-ui/core';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Save} from "@material-ui/icons";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import {getPosts,addPost,deletePost,editPost} from "./api";






const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const PostPage = styled.div`
    text-align : center;
    padding: 10px;
    margin-top:10vh;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    min-height: 90vh;

    strong {
        color : green;
    }
`;

const AddModal = styled.div`
    width: 70%;
    margin: 0 auto;
    position:fixed;
    height:90vh;
    top: 10%;
    background-color: #fafafafa;
    z-index: 10;
    gap: 10px;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    transition: all 0.3s ease;
    opacity : ${({open}) => open ? "1" : "0"};
    pointer-events : ${({open}) => open ? "fill" : "none"};

    .btn__container {
      width:70%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      gap:15px;
      align-items: center;
    }


    textarea {
        resize: none;
        padding: 10px;
        border-radius: 5px;
        border : none;
        font-size: 16px;
        font-family: Poppins;
        background-color: #eee;
    }

    i {
        color:red;
        font-size: 15px;
    }

    strong {
        color:green;
        font-size: 15px;
    }
`;



const EditModal = styled.div`
    width: 70%;
    margin: 0 auto;
    position:fixed;
    height: 100vh;
    top: 0px;
    background-color: #fafafafa;
    z-index: 25;
    gap: 15px;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    transition: all 0.3s ease;
    opacity : ${({show}) => show ? "1" : "0"};
    pointer-events : ${({show}) => show ? "fill" : "none"};

    .btn__container {
      width:70%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      gap:15px;
      align-items: center;
    }


    textarea {
        resize: none;
        padding: 10px;
        border-radius: 5px;
        border : none;
        font-size: 16px;
        font-family: Poppins;
        background-color: #eee;
    }

    i {
        color:red;
        font-size: 15px;
    }

    strong {
        color:green;
        font-size: 15px;
    }
`;


const EmptyPosts = styled.h1`
        position : absolute;
        top : 200px;
        font-weight:bolder;
        font-size: 25px;
        font-family: Poppins;
`;

const PostContainer = styled.div`
padding : 10px;
display: grid;
gap: 10px;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr;
grid-template-areas:
  ". . . ."
  ". . . .";
`;

const EachPost = styled.div`
    text-align:center;
    height: 55vh;
    background-color: #eeee;
    border-radius: 5px;
    display:flex;
    flex-direction : column;
    align-items:center;
    justify-content: center;
    padding : 10px;
    gap: 10px;

    h1 {
        height: 15vh;
    }

    img {
        object-fit = cover;
        width: 100%;
    }

    .ed__container {
        width:80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`;


const Post = () => {
   

    const [open,setOpen] = useState(false);
    const [show,setShow] = useState(false);
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const classes = useStyles();
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [file,setFile] = useState("");
    const [titleErr,setTitleErr] = useState("");
    const [descErr,setDescErr] = useState("");
    const [addSuccess,setAddSuccess] = useState("");
    const [deleteSuccess,setDeleteSuccess] = useState("");
    const [render,setRender] = useState(false);

    const [id,setId] = useState("");
    const [newStatus,setNewStatus] = useState("");
    
    const [newTitle,setNewTitle] = useState("");
    const [newTitleErr,setNewTitleErr] = useState("");

    const [newDesc,setNewDesc] = useState("");
    const [newDescErr,setNewDescErr] = useState("");

    const [img,setImage] = useState("");
    
    
    const src = "http://localhost:8000/storage";
    
    const handlePostSave = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title",title);
        data.append("description",desc);
        data.append("image",file);
        const response = await addPost(data);
        if(response.errors)
        {
            if(response.errors.title)
            {
                setTitleErr(response.errors.title[0]);
            }else {
                setTitleErr("");
            }
            if(response.errors.description)
            {
                setDescErr(response.errors.description[0])
            }else {
                setDescErr("");
            }
            return;
        }

        setAddSuccess(response.response);
        setRender(!render);
        setTitle("");
        setDesc("");
        setFile("");
        setTimeout(() => {
            setAddSuccess("");
            setOpen(false);
        },1200);
    }


    const handleDelete = async (id) => {
        const response = await deletePost(id);
        setDeleteSuccess(response.response);
        setRender(!render);
        setTimeout(() => {
            setDeleteSuccess("");
        },1500)
    }

    const handleEditModalShow = (id,title,desc,img) => {
        setShow(true);
        setId(id);
        setNewTitle(title);
        setNewDesc(desc);
        setImage(img);
    }

    const handleEdit = async () => {
 
        const formData = new FormData();
        formData.append("title",newTitle);
        formData.append("description",newDesc);
        formData.append("image",img);
        const response = await editPost(formData,id);
        if(response.errors)
        {
            if(response.errors.description)
            {
                setNewDescErr(response.errors.description[0]);
            }
            if(response.errors.title)
            {
                setNewTitleErr(response.errors.title[0]);
            }
            return;
        }else {
            setNewTitleErr("");
            setNewDescErr("");
        }
        
        setNewTitle("");
        setNewDesc("");
        setImage("");
        setId("");
        setNewStatus(response.response);
        setRender(!render);

        setTimeout(() => {
            handleEditModalClose();
        },1500);
   
    }

    const handleEditModalClose = () => {
        setNewStatus("");
        setShow(false);
    } 

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await getPosts();
            setLoading(false);
            setPosts([...response.response.data]);
        })();
    }, [render]);

    return ( 
        <PostPage>
        <Button variant="contained" color="primary"
        onClick={e => {
            setOpen(true);
        }}
        >Add a post
        </Button>
        {deleteSuccess && <p><strong>{deleteSuccess}</strong></p>}
        {posts.length == 0 && <EmptyPosts>You have no posts yet !</EmptyPosts> }
        <AddModal open={open}>            
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h3" variant="h5">
                        Add Posts
                    </Typography>
                    <form className={classes.form} noValidate>
                       {titleErr && <p><i>{titleErr}</i></p>}
                       {addSuccess && <p><strong>{addSuccess}</strong></p>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value)
                                setTitleErr("");
                            }}
                        />
                       {descErr && <p><i>{descErr}</i></p>}
                        <textarea placeholder="Description" id="" cols="23" rows="10"
                        value={desc}
                        onChange={e => {
                    setDesc(e.target.value)
                    setDescErr("");
                                }}
                        
                        ></textarea>
                        <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }}>
                <Input type="file" id="fileId" style={{ display: 'none' }}
                onChange={e => {
                    setFile(e.target.files[0]);
                }}
                />
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => document.getElementById('fileId').click()}
                >Upload Image</Button>
              </FormControl>
                <div className="btn__container">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            startIcon={<Save />}
                            onClick={handlePostSave}
                        >
                            Save
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </AddModal>


        <EditModal show={show}>            
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h3" variant="h5">
                        Edit Post
                    </Typography>
                    <form className={classes.form} noValidate>
                       {newTitleErr && <p><i>{newTitleErr}</i></p>}
                       {newStatus && <p><strong>{newStatus}</strong></p>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="New Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={newTitle}
                            onChange={e => {
                                setNewTitle(e.target.value)
                                setNewTitleErr("");
                            }}
                        />
                       {newDescErr && <p><i>{newDescErr}</i></p>}
                        <textarea placeholder="Description" id="" cols="23" rows="10"
                        value={newDesc}
                        onChange={e => {
                    setNewDesc(e.target.value)
                    setNewDescErr("");
                                }}
                        
                        ></textarea>
                        <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }}>
                <Input type="file" id="fileIdd" style={{ display: 'none' }}
                onChange={e => {
                    setImage(e.target.files[0]);
                }}
                />
                New image is not required*
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => document.getElementById('fileIdd').click()}
                >Upload Image</Button>
              </FormControl>
                <div className="btn__container">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            startIcon={<EditIcon />}
                            onClick={e => {
                                e.preventDefault();
                                handleEdit();
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Cancel
                        </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </EditModal>


              {loading ? (<Loader
        type="ThreeDots"
        color="#9bff6d"
        height={100}
        width={100}
        timeout={100000} //3 secs
            />) : (
                <PostContainer>
                {posts.map(post => {
                    return (
                        <EachPost key={post.id}>
                            <h1>Title : {post.title}</h1>
                            <img src={`${src}/${post.image}`} height="200px" />
                            <Link to={`/posts/${post.id}`}>Read more</Link>
                            <div className="ed__container">
                            <Button
                color="primary"
                size="small"
                variant="contained"
                startIcon={<EditIcon />}
                onClick={e => {
                    handleEditModalShow(post.id,post.title,post.description,post.image);
                }}
                >
                    Edit
                  </Button>
                  <Button
                  size="small"
              color="secondary"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick = {e => {
                  handleDelete(post.id)
              }}
                  >
                    Delete
                  </Button>
                  </div>
                        </EachPost>
                    )
                }) }
                </PostContainer>
            ) }
        </PostPage>
     );
}
 
export default Post;