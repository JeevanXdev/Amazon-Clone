let deliveryOptions = [{
    id : '1' ,
    deliveryDays : 7 , 
    priceCents : 0
    }, 
    {
        id : '2' ,
        deliveryDays : 3,
        priceCents : 499
    } , 
    {
        id : '3',
        deliveryDays : 1,
        priceCents : 999
    }];
    
    export default deliveryOptions;

    export function getdeliveryOption(deliveryOptionId) {
        // Use the correct variable `deliveryOptions` to find the selected delivery option
        let selectedDeliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
    
        if (!selectedDeliveryOption) {
            console.error('No matching delivery option found.');
            return;
        }
    
        return selectedDeliveryOption || deliveryOptions[0];
    }
    