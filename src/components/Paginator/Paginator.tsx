import './Paginator.css';

type PaginatorProps = {
  children: React.ReactNode;
  currentPage: number;
  lastPage: number;
  // onPrevious: (x: 'previous') => void;
  // onNext: (y: 'next') => void;
};

function Paginator(props: PaginatorProps) {
  return (
    <div className="paginator">
      {props.children}
      <div className="paginator__controls">
        {props.currentPage > 1 && (
          <button className="paginator__control" /*onClick={props.onPrevious}*/>
            Previous
          </button>
        )}
        {props.currentPage < props.lastPage && (
          <button className="paginator__control" /*onClick={props.onNext}*/>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Paginator;
