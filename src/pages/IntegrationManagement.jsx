import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const IntegrationManagement = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Integration Management</h1>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="sms-tab" data-bs-toggle="tab" data-bs-target="#sms" type="button" role="tab" aria-controls="sms" aria-selected="true">SMS Integration</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="whatsapp-tab" data-bs-toggle="tab" data-bs-target="#whatsapp" type="button" role="tab" aria-controls="whatsapp" aria-selected="false">WhatsApp Integration</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="email-tab" data-bs-toggle="tab" data-bs-target="#email" type="button" role="tab" aria-controls="email" aria-selected="false">Email Integration</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="sms" role="tabpanel" aria-labelledby="sms-tab">
          <form className="p-3" id="smsForm">
            <div className="mb-3">
              <label htmlFor="smsProviderName" className="form-label">SMS Provider Name</label>
              <input type="text" className="form-control" id="smsProviderName" />
            </div>
            <div className="mb-3">
              <label htmlFor="apiKey" className="form-label">API Key</label>
              <input type="text" className="form-control" id="apiKey" />
            </div>
            <div className="mb-3">
              <label htmlFor="apiSecret" className="form-label">API Secret</label>
              <input type="text" className="form-control" id="apiSecret" />
            </div>
            <div className="mb-3">
              <label htmlFor="senderID" className="form-label">Sender ID</label>
              <input type="text" className="form-control" id="senderID" />
            </div>
            <div className="mb-3">
              <label htmlFor="endpointURL" className="form-label">Endpoint URL</label>
              <input type="text" className="form-control" id="endpointURL" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="isActiveSMS" />
              <label className="form-check-label" htmlFor="isActiveSMS">Is Active</label>
            </div>
            <button type="submit" className="btn btn-primary">Save SMS Integration</button>
          </form>
        </div>
        <div className="tab-pane fade" id="whatsapp" role="tabpanel" aria-labelledby="whatsapp-tab">
          <form className="p-3" id="whatsappForm">
            <div className="mb-3">
              <label htmlFor="whatsAppProviderName" className="form-label">WhatsApp Provider Name</label>
              <input type="text" className="form-control" id="whatsAppProviderName" />
            </div>
            <div className="mb-3">
              <label htmlFor="whatsAppAPIKey" className="form-label">API Key</label>
              <input type="text" className="form-control" id="whatsAppAPIKey" />
            </div>
            <div className="mb-3">
              <label htmlFor="whatsAppAPISecret" className="form-label">API Secret</label>
              <input type="text" className="form-control" id="whatsAppAPISecret" />
            </div>
            <div className="mb-3">
              <label htmlFor="whatsAppEndpointURL" className="form-label">Endpoint URL</label>
              <input type="text" className="form-control" id="whatsAppEndpointURL" />
            </div>
            <div className="mb-3">
              <label htmlFor="businessNumber" className="form-label">Business Number</label>
              <input type="text" className="form-control" id="businessNumber" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="isActiveWhatsApp" />
              <label className="form-check-label" htmlFor="isActiveWhatsApp">Is Active</label>
            </div>
            <button type="submit" className="btn btn-primary">Save WhatsApp Integration</button>
          </form>
        </div>
        <div className="tab-pane fade" id="email" role="tabpanel" aria-labelledby="email-tab">
          <form className="p-3" id="emailForm">
            <div className="mb-3">
              <label htmlFor="emailProviderName" className="form-label">Email Provider Name</label>
              <input type="text" className="form-control" id="emailProviderName" />
            </div>
            <div className="mb-3">
              <label htmlFor="smtpHost" className="form-label">SMTP Host</label>
              <input type="text" className="form-control" id="smtpHost" />
            </div>
            <div className="mb-3">
              <label htmlFor="smtpPort" className="form-label">SMTP Port</label>
              <input type="number" className="form-control" id="smtpPort" />
            </div>
            <div className="mb-3">
              <label htmlFor="smtpUsername" className="form-label">SMTP Username</label>
              <input type="text" className="form-control" id="smtpUsername" />
            </div>
            <div className="mb-3">
              <label htmlFor="smtpPassword" className="form-label">SMTP Password</label>
              <input type="password" className="form-control" id="smtpPassword" />
            </div>
            <div className="mb-3">
              <input type="checkbox" className="form-check-input" id="useSSL" />
              <label className="form-check-label" htmlFor="useSSL">Use SSL</label>
            </div>
            <button type="submit" className="btn btn-primary">Save Email Integration</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IntegrationManagement;
