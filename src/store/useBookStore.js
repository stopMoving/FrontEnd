import { create } from 'zustand';

const useBookStore = create((set) => ({
    scannedBooks: [],

    addScannedBook: (book) => {
        set((state) => {
            const existingBook = state.scannedBooks.find(b => b.isbn === book.isbn);
            if (existingBook) {
                return {
                    scannedBooks: state.scannedBooks.map(b =>
                        b.isbn === book.isbn ? { ...b, quantity: b.quantity + 1 } : b
                    ),
                };
            }
            return {
                scannedBooks: [...state.scannedBooks, { ...book, quantity: book.quantity }],
            };
        });
    },
    // 특정 책의 수량을 업데이트하는 함수
    updateBookQuantity: (isbn, change) => {
        set((state) => ({
            scannedBooks: state.scannedBooks.map(book =>
                book.isbn === isbn
                ? { ...book, quantity: Math.max(1, book.quantity + change)}
                : book
            ),
        }));
    },
    //책 목록을 초기화하는 함수
    clearScannedBooks: () => {
        set({ scannedBooks: [] });
    },
}));

export default useBookStore;