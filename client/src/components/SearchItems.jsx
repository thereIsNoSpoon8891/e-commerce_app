


const SearchItems = props => {

    const { name, description, imageUrl, price, owner_id, owner_name  } = props;

 
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
<p>
    posted by: {owner_name}
</p>
<button>
        message
    </button>
</div >
)
}
 
export default SearchItems