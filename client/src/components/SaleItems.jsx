


const SaleItems = props => {

    const { name, description, imageUrl, price, owner_id  } = props;
 
return (
<div className="list-items">
<h6>
    {name}
</h6>
<h4>
    {description}
</h4>
<img src={imageUrl} />
<p>
    {price}
</p>
</div>
)
}
 
export default SaleItems