import React,{Component} from 'react'
import {Form} from 'react-bootstrap'
import { TailSpin } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const api_Url = "https://api.unsplash.com/search/photos"
const no_of_images = 24

class Image extends Component {

    state = {searchInput:'',images:[],page:1,isLoading:false}

    onChangeSearchInput = e =>{
        this.setState({searchInput:e.target.value})
    }
    onSubmitForm = async (event) => {
        event.preventDefault();
        this.setState({ page: 1 }, await this.fetchImages);
    }

    fetchImages = async () => {
        this.setState({isLoading:true})
        const { searchInput,page } = this.state;
        const response = await fetch(`${api_Url}?query=${searchInput}&page=${page}&per_page=${no_of_images}&client_id=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
        this.setState({ images: data.results,isLoading:false });
    }

    onClickCat = () =>{
        this.setState({searchInput:"cat"},this.fetchImages)
    }
    onClickDog = () =>{
        this.setState({searchInput:"dog"},this.fetchImages)
    }
    onClickLion = () =>{
        this.setState({searchInput:"lion"},this.fetchImages)
    }
    onClickTiger = () =>{
        this.setState({searchInput:"tiger"},this.fetchImages)
    }
    onClickPrev = () => {
        this.setState((prevState) => ({ page: prevState.page - 1 }), this.fetchImages);
    }

    onClickNext = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchImages);
    }

    render(){
        const {searchInput,images,page,isLoading} = this.state

        

        return(
            <>
            <div className='container'>
            {console.log(process.env.REACT_APP_API_KEY)}
                <h1 className='title text-primary'>Image Search</h1>
                <div className='search-section'>
                <Form onSubmit={this.onSubmitForm}>
                <Form.Control type="search" placeholder="Enter Something to Search" className='search-input' onChange={this.onChangeSearchInput} value={searchInput}/>
                </Form>
                </div>
                <div className='filter'>
            <button className='btn btn-primary m-2' onClick={this.onClickCat}>Cat</button>
            <button className='btn btn-primary m-2'  onClick={this.onClickDog}>Dog</button>
            <button className='btn btn-primary m-2' onClick={this.onClickLion}>Lion</button>
            <button className='btn btn-primary m-2' onClick={this.onClickTiger}>Tiger</button>
            </div>
            <div className='image-results'>
                    {isLoading ? (
                        <div className="loader">
                            <TailSpin color="#00BFFF" height={80} width={80} />
                        </div>
                    ) : (
                        images.length > 0 ? (
                            images.map(image => (
                                <img key={image.id} src={image.urls.small} alt={image.description} className='image-thumbnail' />
                            ))
                        ) : (
                            <p>No images found</p>
                        )
                    )}
                </div>
                    <div className='pagination'>
                        <button className='btn btn-primary m-2' onClick={this.onClickPrev} disabled={page === 1 || isLoading}>Prev</button>
                        <button className='btn btn-primary m-2' onClick={this.onClickNext} disabled={isLoading}>Next</button>
                    </div>

                
            </div>
            
            
            </>
        )
    }
}
export default Image