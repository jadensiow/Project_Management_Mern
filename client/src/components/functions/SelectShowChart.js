// Material UI
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const SelectShowChart = ({ list, handleMenuItemClick }) => {
  return (
    <Breadcrumbs maxItems={2} aria-label="breadcrumb">
      {list.map((option) => (
        <Link
          color="inherit"
          onClick={(event) => handleMenuItemClick(event)}
          key={option._id}
          id={option._id}
        >
          {option.title}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
export default SelectShowChart;
