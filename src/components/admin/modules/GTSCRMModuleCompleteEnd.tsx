      {/* Modal Forms */}
      {showNewLeadForm && (
        <NewLeadForm 
          onSubmit={handleNewLead}
          onClose={() => setShowNewLeadForm(false)}
        />
      )}
      
      {showNewDealForm && (
        <NewDealForm 
          onSubmit={handleNewDeal}
          onClose={() => setShowNewDealForm(false)}
        />
      )}
      
      {showAutomationBuilder && (
        <AutomationRuleBuilder 
          onSubmit={handleNewAutomation}
          onClose={() => setShowAutomationBuilder(false)}
        />
      )}
    </div>
  );
}