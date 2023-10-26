


const SearchItems = props => {

    const { name, description, imageUrl, price, owner_id  } = props;

 
return (
<div className="list-items">
<h1>
    {name}
</h1>

<div>
    <p>
        {description}
    </p>
</div>

<img src={imageUrl} />
<p>
    {price}
</p>
</div >
)
}
 
export default SearchItems