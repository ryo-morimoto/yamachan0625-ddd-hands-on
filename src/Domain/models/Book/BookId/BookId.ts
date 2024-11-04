import isEqual from 'lodash/isEqual'

export class BookId {
    private readonly _value: string

    constructor(value: string) {
        this._value = value
    }

    equals(other: BookId): boolean {
        return isEqual(this._value, other._value)
    }

    get value(): string {
        return this._value
    }
}
