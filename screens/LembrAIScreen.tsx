import React, { useState, useMemo } from 'react';
import { useData } from '../hooks/useMockData';
import { Reminder } from '../types';
import TeamMemberReminderCard from '../components/TeamMemberReminderCard';
import RecentRemindersCard from '../components/RecentRemindersCard';
import { PlusIcon } from '../components/icons/PlusIcon';
import Modal from '../components/Modal';
import ReminderForm from '../components/forms/ReminderForm';


interface LembrAIScreenProps {
    onBack: () => void;
}

const LembrAIScreen: React.FC<LembrAIScreenProps> = ({ onBack }) => {
    const { teamMembers, reminders, addReminder, updateReminder, deleteReminder } = useData();

    const [isFormOpen, setFormOpen] = useState(false);
    const [editingReminder, setEditingReminder] = useState<Reminder | undefined>(undefined);
    const [preselectedAssigneeId, setPreselectedAssigneeId] = useState<string | null>(null);

    const remindersByAssignee = useMemo(() => {
        const map: { [key: string]: Reminder[] } = { everyone: [] };
        teamMembers.forEach(tm => map[tm.id] = []);
        
        reminders.forEach(reminder => {
            if (map[reminder.assigneeId]) {
                map[reminder.assigneeId].push(reminder);
            } else {
                 map.everyone.push(reminder);
            }
        });
        return map;
    }, [reminders, teamMembers]);
    
    const handleAddNew = (assigneeId: string | null = null) => {
        setEditingReminder(undefined);
        setPreselectedAssigneeId(assigneeId);
        setFormOpen(true);
    };

    const handleEdit = (reminder: Reminder) => {
        setEditingReminder(reminder);
        setPreselectedAssigneeId(null);
        setFormOpen(true);
    };

    const handleToggle = (reminder: Reminder) => {
        updateReminder({ ...reminder, isActive: !reminder.isActive });
    };

    const handleSave = (reminderData: Omit<Reminder, 'id' | 'createdAt'> | Reminder) => {
        if ('id' in reminderData) {
            updateReminder(reminderData);
        } else {
            addReminder(reminderData);
        }
        setFormOpen(false);
    };


    return (
        <div className="animate-fade-in">
            <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-dark-secondary hover:text-dark-text mb-2">
                        &larr; Voltar ao Dashboard
                    </button>
                    <h1 className="text-3xl sm:text-4xl font-bold text-dark-text">Central de Lembretes - <span className="text-dark-primary">LembrAI</span></h1>
                </div>
                <button onClick={() => handleAddNew()} className="flex items-center gap-2 bg-dark-primary text-dark-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-bold">
                    <PlusIcon />
                    <span>Novo Lembrete</span>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-6">
                    {teamMembers.map((member) => (
                        <TeamMemberReminderCard 
                            key={member.id}
                            member={member}
                            reminders={remindersByAssignee[member.id] || []}
                            onAdd={() => handleAddNew(member.id)}
                            onEdit={handleEdit}
                            onDelete={deleteReminder}
                            onToggle={handleToggle}
                        />
                    ))}
                </main>

                <aside className="lg:col-span-1">
                     <RecentRemindersCard 
                        reminders={reminders}
                        teamMembers={teamMembers}
                        everyoneReminders={remindersByAssignee.everyone || []}
                     />
                </aside>
            </div>
            
            <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
                <ReminderForm
                    initialData={editingReminder}
                    preselectedAssigneeId={preselectedAssigneeId}
                    onSave={handleSave}
                    onCancel={() => setFormOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default LembrAIScreen;
