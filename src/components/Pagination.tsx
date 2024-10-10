import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from './ui/button';

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (n: number) => void;
};

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="my-4 flex justify-center gap-2">
      <Button
        size="icon"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        <ArrowLeftIcon />
      </Button>
      <p className="bg-black text-white px-2 rounded-lg flex items-center justify-center">
        page {page + 1} of {totalPages}
      </p>
      <Button
        size="icon"
        onClick={() => setPage(page + 1)}
        disabled={page + 1 === totalPages}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
