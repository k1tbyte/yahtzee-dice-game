import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Определение типов транзакций
export type TransactionType = 'Init' | 'Bet' | 'Win';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer')
    value!: number;

    // Добавляем тип 'text' для SQLite
    @Column('text')
    type!: TransactionType;

    @CreateDateColumn()
    timestamp!: Date;
}