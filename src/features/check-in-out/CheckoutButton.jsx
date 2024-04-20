import Button from '../../ui/Button';
import PropTypes from 'prop-types'; 
import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }) {
  const { isLoading, mutate: checkout } = useCheckout();

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}
CheckoutButton.propTypes = {
  bookingId: PropTypes.string.isRequired, 
};
export default CheckoutButton;
