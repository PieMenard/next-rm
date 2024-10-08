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
        disabled={page === 1}
      >
        <ArrowLeftIcon />
      </Button>
      <p className="bg-black text-white w-10 rounded-lg inline-block align-middle">
        {page}
      </p>
      <Button
        size="icon"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
