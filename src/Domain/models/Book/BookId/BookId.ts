import isEqual from 'lodash/isEqual'

export class BookId {
    private readonly _value: string

    static readonly MAX_LENGTH = 13
    static readonly MIN_LENGTH = 10

    constructor(value: string) {
        this.validate(value)
        this._value = value
    }

    private validate(isbn: string): void {
        if (isbn.length < BookId.MIN_LENGTH || isbn.length > BookId.MAX_LENGTH) {
            throw new Error('ISBNの桁数が不正です')
        }

        if (!this.isValidIsbn10(isbn) && !this.isValidIsbn13(isbn)) {
            throw new Error('ISBNの形式が不正です')
        }
    }

    private isValidIsbn10(isbn10: string): boolean {
        return isbn10.length === 10;
    }

    private isValidIsbn13(isbn13: string): boolean {
        return isbn13.startsWith('978') && isbn13.length === 13;
    }

    equals(other: BookId): boolean {
        return isEqual(this._value, other._value)
    }

    get value(): string {
        return this._value
    }

    toISBN(): string {
        if (this._value.length === 10) {
            const groupIdentifier = this._value.substring(0, 1)
            const publisherCode = this._value.substring(1, 3)
            const bookCode = this._value.substring(3, 9)
            const checkSum = this._value.substring(9)

            return `ISBN${groupIdentifier}-${publisherCode}-${bookCode}-${checkSum}`
        } else {
            const isbnPrefix = this._value.substring(0, 3)
            const groupIdentifier = this._value.substring(3, 4)
            const publisherCode = this._value.substring(4, 6)
            const bookCode = this._value.substring(6, 12)
            const checkSum = this._value.substring(12)

            return `ISBN${isbnPrefix}-${groupIdentifier}-${publisherCode}-${bookCode}-${checkSum}`
        }
    }
}
