'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Checkbox } from '@/components/ui/Checkbox';
import { Dropdown } from '@/components/ui/Dropdown';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';
import { storage } from '@/lib/localStorage';
import { Campaign, Contact } from '@/types';
import { MOCK_CAMPAIGNS, generateContacts } from '@/lib/generators';
import { formatDate, generateId, getRandomInt } from '@/lib/utils';
import { Mail, Send, Eye, MousePointer, Plus, FileText } from 'lucide-react';

export default function EmailPage() {
  const { showToast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sendingCampaignId, setSendingCampaignId] = useState<string | null>(null);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    body: '',
    marketingOnly: true,
    locationId: 'all',
  });

  useEffect(() => {
    let savedCampaigns = storage.campaigns.get<Campaign[]>([]);
    if (savedCampaigns.length === 0) {
      savedCampaigns = MOCK_CAMPAIGNS;
      storage.campaigns.set(savedCampaigns);
    }
    setCampaigns(savedCampaigns);

    let savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      savedContacts = generateContacts(250);
      storage.contacts.set(savedContacts);
    }
    setContacts(savedContacts);

    setIsLoading(false);
  }, []);

  const sentCampaigns = campaigns.filter(c => c.status === 'sent');
  const totalSent = sentCampaigns.reduce((sum, c) => sum + c.recipients, 0);
  const totalOpened = sentCampaigns.reduce((sum, c) => sum + c.opened, 0);
  const totalClicked = sentCampaigns.reduce((sum, c) => sum + c.clicked, 0);
  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;

  const getRecipientCount = () => {
    let filtered = contacts;
    if (newCampaign.marketingOnly) {
      filtered = filtered.filter(c => c.marketingConsent);
    }
    if (newCampaign.locationId !== 'all') {
      filtered = filtered.filter(c => c.locationId === newCampaign.locationId);
    }
    return filtered.length;
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.body) {
      showToast('Compila tutti i campi obbligatori', 'error');
      return;
    }

    const campaign: Campaign = {
      id: generateId(),
      name: newCampaign.name,
      subject: newCampaign.subject,
      body: newCampaign.body,
      sentAt: null,
      recipients: 0,
      opened: 0,
      clicked: 0,
      status: 'draft',
      targetFilter: {
        allContacts: !newCampaign.marketingOnly,
        marketingConsentOnly: newCampaign.marketingOnly,
        locationIds: newCampaign.locationId !== 'all' ? [newCampaign.locationId] : [],
      },
    };

    const updated = [campaign, ...campaigns];
    setCampaigns(updated);
    storage.campaigns.set(updated);
    setShowCreateModal(false);
    setNewCampaign({ name: '', subject: '', body: '', marketingOnly: true, locationId: 'all' });
    showToast('Campagna creata come bozza', 'success');
  };

  const handleSendCampaign = async (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    setSendingCampaignId(campaignId);
    setIsSending(true);
    setSendProgress(0);

    const recipientCount = getRecipientCount();
    
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setSendProgress(i);
    }

    const opened = Math.floor(recipientCount * (getRandomInt(35, 65) / 100));
    const clicked = Math.floor(opened * (getRandomInt(15, 35) / 100));

    const updated = campaigns.map(c => 
      c.id === campaignId 
        ? { ...c, status: 'sent' as const, sentAt: new Date().toISOString(), recipients: recipientCount, opened, clicked }
        : c
    );
    setCampaigns(updated);
    storage.campaigns.set(updated);

    setIsSending(false);
    setSendingCampaignId(null);
    showToast(`Campagna inviata con successo a ${recipientCount} contatti!`, 'success');
  };

  const columns = [
    { key: 'name', header: 'Nome Campagna' },
    { key: 'subject', header: 'Oggetto' },
    {
      key: 'sentAt',
      header: 'Data Invio',
      render: (c: Campaign) => c.sentAt ? formatDate(c.sentAt) : '-',
    },
    {
      key: 'recipients',
      header: 'Destinatari',
      render: (c: Campaign) => c.recipients.toLocaleString('it-IT'),
    },
    {
      key: 'opened',
      header: 'Aperture',
      render: (c: Campaign) => c.status === 'sent' 
        ? `${c.opened} (${Math.round((c.opened / c.recipients) * 100)}%)`
        : '-',
    },
    {
      key: 'clicked',
      header: 'Click',
      render: (c: Campaign) => c.status === 'sent' 
        ? `${c.clicked} (${c.opened > 0 ? Math.round((c.clicked / c.opened) * 100) : 0}%)`
        : '-',
    },
    {
      key: 'status',
      header: 'Stato',
      render: (c: Campaign) => (
        <Badge variant={c.status === 'sent' ? 'success' : c.status === 'draft' ? 'default' : 'warning'}>
          {c.status === 'sent' ? 'Inviata' : c.status === 'draft' ? 'Bozza' : 'Programmata'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (c: Campaign) => c.status === 'draft' && (
        <Button 
          size="sm" 
          onClick={(e) => { e.stopPropagation(); handleSendCampaign(c.id); }}
          loading={sendingCampaignId === c.id}
        >
          <Send className="w-4 h-4 mr-1" />
          Invia
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Inviate</p>
                <p className="text-2xl font-bold text-gray-900">{totalSent.toLocaleString('it-IT')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tasso Apertura</p>
                <p className="text-2xl font-bold text-gray-900">{openRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tasso Click</p>
                <p className="text-2xl font-bold text-gray-900">{clickRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sending Progress */}
      {isSending && (
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary-500 animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-2">Invio in corso...</p>
                <ProgressBar value={sendProgress} showLabel />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Campagne</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Nuova Campagna
        </Button>
      </div>

      {/* Campaigns Table */}
      <Card padding="none">
        <Table
          columns={columns as any}
          data={campaigns as any}
          getRowId={(c: any) => c.id}
          emptyMessage="Non hai ancora creato campagne. Crea la tua prima!"
        />
      </Card>

      {/* Create Campaign Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Nuova Campagna Email"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Nome Campagna"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign(c => ({ ...c, name: e.target.value }))}
            placeholder="Es. Newsletter Marzo"
            required
          />

          <Input
            label="Oggetto Email"
            value={newCampaign.subject}
            onChange={(e) => setNewCampaign(c => ({ ...c, subject: e.target.value }))}
            placeholder="Es. Le novità del mese!"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Corpo Email <span className="text-red-500">*</span>
            </label>
            <textarea
              value={newCampaign.body}
              onChange={(e) => setNewCampaign(c => ({ ...c, body: e.target.value }))}
              placeholder="Scrivi il contenuto della tua email..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Destinatari</h4>
            <div className="space-y-3">
              <Checkbox
                checked={newCampaign.marketingOnly}
                onChange={(e) => setNewCampaign(c => ({ ...c, marketingOnly: e.target.checked }))}
                label="Solo contatti con consenso marketing"
              />
              <Dropdown
                label="Filtra per sede"
                options={[
                  { value: 'all', label: 'Tutte le sedi' },
                  { value: 'loc-1', label: 'Sede Centro' },
                  { value: 'loc-2', label: 'Sede Mare' },
                ]}
                value={newCampaign.locationId}
                onChange={(v) => setNewCampaign(c => ({ ...c, locationId: v }))}
              />
              <p className="text-sm text-gray-500">
                Destinatari stimati: <strong>{getRecipientCount()}</strong> contatti
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">
              Annulla
            </Button>
            <Button variant="secondary" onClick={handleCreateCampaign} className="flex-1">
              <FileText className="w-4 h-4 mr-1" />
              Salva Bozza
            </Button>
            <Button onClick={() => { handleCreateCampaign(); }} className="flex-1">
              <Send className="w-4 h-4 mr-1" />
              Crea e Invia
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
