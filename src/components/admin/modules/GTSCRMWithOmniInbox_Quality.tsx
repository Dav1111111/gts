          {/* Quality & Trends Tab */}
          <TabsContent value="quality" className="mt-6">
            <div className="space-y-6">
              {/* Quality Tab Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading text-white">Quality & Trends Dashboard</h2>
                  <p className="text-sm text-[#A6A7AA]">Comprehensive analytics for service quality and conversion trends</p>
                </div>
                <Button 
                  onClick={() => setActiveTab('quality')}
                  className="bg-[#91040C] hover:bg-[#91040C]/90"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Full Analytics
                </Button>
              </div>
              
              {/* Embedded Quality Dashboard */}
              <GTSQualityTrendsDashboard />
            </div>
          </TabsContent>