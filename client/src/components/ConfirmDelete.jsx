


const ConfirmDelete = props => {
 
    const {
      name,
        //start search item props
        updateSearchingForItemsInItemContext, // remove item in item context state
        editProfileSearchingItemsState,  // remove item in profile context state
        deleteItemSearchingFor, // API call to delete message from DB
        id,
        wantedItemsArrayInProfileState,   // items array in profile context
        itemsWantedItemContext, // items array in item context
        // ^end search items props^
        itemType,// identify type of requests needed
        handleDeleteModal,
        //start sale items props \/
        editProfileForSaleItemsState,
        itemsForSaleInProfileState,
        itemsForSaleItemContext,
        deleteItemForSale,
        updateForSaleItemsArrayInState
      } = props;

console.log(id)
      function handleWantedItemsRemoval() {
        deleteItemSearchingFor(id);// API call
        editProfileSearchingItemsState(wantedItemsArrayInProfileState, id);// remove item in PROFILE context
        updateSearchingForItemsInItemContext(itemsWantedItemContext, id);// remove item in ITEM context
        handleDeleteModal();// toggle confirm prompt
      }

      function handleSaleItemsRemoval() {
        deleteItemForSale(id);
        editProfileForSaleItemsState(itemsForSaleInProfileState, id);
        updateForSaleItemsArrayInState(itemsForSaleItemContext, id);
        handleDeleteModal();
      }

      function handleConfirmDelete() {
        itemType === "wanted" ? handleWantedItemsRemoval() : handleSaleItemsRemoval();
      }

return (
<div className="post-modal">
    <h1>
        Are you sure you want to delete "{name}"?
    </h1>
    
    <button onClick={handleConfirmDelete}>
        Yes
    </button>
    <button onClick={handleDeleteModal}>
        Cancel
    </button>
</div>
)
}
 
export default ConfirmDelete