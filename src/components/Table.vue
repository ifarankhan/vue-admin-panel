 <template>
     <DataTable :value="customers" :paginator="paginator" class="p-datatable-customers" :rows="rows"
            @page="tableStatePersistence($event)"
            dataKey="id" :rowHover="rowHover" :loading="loading"
            :paginatorTemplate="paginatorTemplate"
            :rowsPerPageOptions="rowsPerPageOptions"
            :first="first"
            ref="dt"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :scrollable="true"
            @row-click="paginatorUser,$emit('rowClicked', $event)">
            <template #empty>
                No {{ defaultText }} found.
            </template>
            <template #loading>
                Loading {{ defaultText }} data. Please wait.
            </template>

            <!-- <template #header>
                <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>
            </template> -->
            <span v-if="tableType=='tickets'">
              <Column field="createDate" header="Create Date" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div>
                         <span> {{ formatDate(data.createDate) }} </span>
                 </div>
                </template>
              </Column>
              <Column field="CreatedTime" header="Time" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{ data.CreatedTime}} </span>
                </template>
              </Column>
              <Column field="subject" header="Subject" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <div class="truncate">{{data.subject}}</div>
                  </template>
              </Column>
               <Column field="Priority" header="priority" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <div>{{ data.priority && fresDeskPriorities.find(item=> item.value == +data.priority).text  }}</div>
                  </template>
              </Column>
               <Column field="status" header="Status" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <div>{{ data.status && fresDeskStatuses.find(item=> item.value == +data.status).text  }}</div>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body>
                  <div class="my-center-text">
                    <svg xmlns="http://www.w3.org/2000/svg" @click.prevent="showConsole()" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
              </template>
            </Column>
            </span>

            <span v-if="tableType=='accountUsers'">
              <Column field="firstName" header="First Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div class="truncate custome-width">
                         <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="../assets/svgs/buddy.svg" alt="" /> </span>
                         <span> {{data.firstName}} </span>
                 </div>
                </template>
              </Column>
              <Column field="familyname" header="Family Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data.familyName}} </span>
                </template>
              </Column>
              <Column field="email" header="User Name" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <div class="truncate">{{data.email}}</div>
                  </template>
              </Column>
              <Column field="userType" header="User Type" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text"> {{userTypes[data.userType]}}</span>
                  </template>
              </Column>
               <Column header="Credits" sortField="credits" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text">{{ data.credits }}</span>
                  </template>
              </Column>
              <Column header="Status" sortField="status" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text">{{ data.status?"Active":"In-Active" }}</span>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body>
                  <div class="my-center-text">
                    <svg xmlns="http://www.w3.org/2000/svg" @click.prevent="showConsole()" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
              </template>
            </Column>
            </span>

        <span v-if="tableType=='distributorsList'">
              <Column header="SN" style="cursor: pointer;">
                <template #body="{data}">
                   <span> {{  String(data.sno).padStart(2, '0') }} </span>
                </template>
              </Column>
              <Column field="name" header="Display Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                   <span> {{data.displayName}} </span>
                </template>
              </Column>
              <Column field="eamil" header="Distributor Email" sortField="email" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                  <div class="truncate custome-width">
                      <span>{{data.email}} </span>
                  </div>
                </template>
              </Column>
               <Column header="No. of Clients" sortField="numberOfClients" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                     <div>
                      <span>{{ data.numberOfClients }}</span>
                     </div>
                  </template>
              </Column>
               <Column header="Credit Limit" sortField="transferableCreditLimit" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.transferableCreditLimit }}</span>
                  </template>
              </Column>
              <Column header="Status" sortField="status" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data?.active?"Active":"In-Active" }}</span>
                  </template>
              </Column>
               <Column header="Invoice Currency" sortField="invoiceCurrency" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.invoiceCurrency }}</span>
                  </template>
              </Column>

              <Column header="Last Credit Update" sortField="lastCreditUpdate" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data?.lastCreditUpdate && formatDate(data.lastCreditUpdate.split(" ")[0]) }}</span>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body>
                  <div class="my-center-text">
                    <svg xmlns="http://www.w3.org/2000/svg" @click.prevent="showConsole()" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
              </template>
            </Column>
            </span>

            <span v-if="tableType=='creditTableFirst'">
              <Column field="date" header="Date" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ formatDate(data.date) }}</span>
                </template>
              </Column>
              <Column field="time" header="Time" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{ data?.time }} </span>
                </template>
              </Column>
              <Column field="amount" header="Credit Requested" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                  <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body>
                  <div class="my-center-text" aria-haspopup="true" aria-controls="overlay_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <!-- <div>
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('correctCreditUpdate')">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div> -->
              </template>
            </Column>
            </span>

             <span v-if="tableType=='creditTableSecond'">
              <Column field="date" header="Date of Update" :sortable="sortTable" style="min-width: 15rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ formatDate(data.date) }}</span>
                </template>
              </Column>
              <Column field="time" header="Time" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{ data?.time }} </span>
                </template>
              </Column>
              <Column field="requestAmount" header="Credit Requested" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.requestAmount }}</span>
                  </template>
              </Column>
              <Column field="accountName" header="Client" :sortable="sortTable" style="min-width: 5rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data.accountName?data.accountName:'--' }}</span>
                </template>
              </Column>
              <Column field="email" header="Admin Email Address" :sortable="sortTable" style="min-width: 15rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.masterUserEmail?data?.masterUserEmail:'--' }}</span>
                </template>
              </Column>
              <Column field="adminFullName" header="Admin Name" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="">{{ data.adminFullName =="   "?'--':data.adminFullName }}</span>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text" @click.stop="toggle($event, data)" aria-haspopup="true" aria-controls="overlay_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <div v-if="daysDiffrence(data?.dateOfUpdate) <=5 ? true: false">
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('correctCreditUpdate')">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div>
              </template>
            </Column>
            </span>

             <span v-if="tableType=='creditTableThird'">
              <Column field="date" header="Date" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ formatDate(data.date) }}</span>
                </template>
              </Column>
              <Column field="time" header="Time" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.time }} </span>
                </template>
              </Column>
              <Column field="amount" header="Credit Requested" sortField="amount" :sortable="sortTable" style="min-width:13rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column field="firstName" header="End User Name" sortField="firstName" :sortable="sortTable" style="min-width: 13rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.firstName?data.firstName:'--' }}</span>
                  </template>
              </Column>
               <Column field="email" header="End User Email Address" sortField="email" :sortable="sortTable" style="min-width: 18rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.email?data?.email:'--' }}</span>
                </template>
              </Column>
              <Column field="accountName" sortField="Client" header="Client" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.accountName?data?.accountName:'--' }}</span>
                </template>
              </Column>
            <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text" @click.stop="toggle($event, data)" aria-haspopup="true" aria-controls="overlay_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <div v-if="daysDiffrence(data?.dateOfUpdate) <=5 ? true: false">
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('correctCreditUpdate')">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div>
              </template>
            </Column>
            </span>

            <span v-if="tableType =='users'">
              <Column field="name" header="Account Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div class="flex space-x-4 truncate custome-width">
                         <span>
                             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36.136" viewBox="0 0 36 36.136">
                              <defs>
                                <linearGradient id="linear-gradient" x1="0.5" x2="0.514" y2="0.628" gradientUnits="objectBoundingBox">
                                  <stop offset="0" stop-color="#103c58"/>
                                  <stop offset="1" stop-color="#455080"/>
                                </linearGradient>
                              </defs>
                              <g id="Group_36418" data-name="Group 36418" transform="translate(-1418.376 -241.376)">
                                <g id="Group_872" data-name="Group 872" transform="translate(1418 241)" opacity="0.114">
                                  <rect id="Rectangle_3484" data-name="Rectangle 3484" width="36" height="36" rx="5" transform="translate(0.376 0.376)" fill="url(#linear-gradient)"/>
                                  <path id="Path_12665" data-name="Path 12665" d="M230.322,838.457l2.2-2.2a2.7,2.7,0,0,1,4.1,0c2.149,2.195,9.61,9.029,9.61,9.029s0,6.022,0,6.028a2.37,2.37,0,0,1-.857,1.891Z" transform="translate(-209.857 -817.853)" fill="#7a8aaf"/>
                                  <path id="Path_12664" data-name="Path 12664" d="M200.984,838.69l9.634-9.107s2.331-2.5,4.527,0c.949,1.08,16.107,16.029,21.153,20.976a2.9,2.9,0,0,1-1.619.755H203.261a2.722,2.722,0,0,1-2.235-2.362Z" transform="translate(-200.608 -814.802)" fill="#cdd5e0"/>
                                  <ellipse id="Ellipse_595" data-name="Ellipse 595" cx="2.991" cy="2.778" rx="2.991" ry="2.778" transform="translate(23.932 5.556)" fill="#fff"/>
                                </g>
                              </g>
                            </svg>
                         </span>
                         <span class="pt-2">{{data.name}} </span>
                 </div>
                </template>
            </Column>
              <Column field="address" header="Address" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                  <template #body="{data}">
                      <div  class="truncate custome-width">{{data.address}}</div>
                  </template>
              </Column>
              <Column header="No. of Users" sortField="users" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text"> {{data.users}}</span>
                  </template>
              </Column>
               <Column header="Creation Date" sortField="date" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text">{{ formatDate(data.date) }}</span>
                  </template>
              </Column>
              <Column style="min-width: 10rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text" @click.stop="toggle($event, data)" aria-haspopup="true" aria-controls="overlay_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <div>
                    <Menu id="overlay_menu" ref="menu" class="menu-width" :model="actions" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('editItemWasClicked', {eventName: item.label})">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div>
              </template>
            </Column>
            </span>

            <span v-if="tableType =='topClients'">
              <Column field="firstName" header="First Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                  <div>
                    <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="../assets/svgs/buddy.svg" alt="" /> </span>
                    <span> {{data.firstName}} </span>
                 </div>
                </template>
            </Column>
              <Column field="familyName" header="Family Name" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                  <template #body="{data}">
                      <span> {{data.familyName}} </span>
                  </template>
              </Column>
              <Column header="Email" sortField="email" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span> {{data.email}}</span>
                  </template>
              </Column>
               <!-- <Column header="Date" sortField="date" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.dateOfUpdate.split("T")[0] }}</span>
                  </template>
              </Column>
               <Column header="Time" sortField="time" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.dateOfUpdate.split("T")[1].split("Z")[0] }}</span>
                  </template>
              </Column> -->
            </span>
             <span v-if="tableType =='lowCreditCLients'">
              <Column field="firstName" header="First Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                  <div>
                    <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="../assets/svgs/buddy.svg" alt="" /> </span>
                    <span> {{data.firstName}} </span>
                 </div>
                </template>
            </Column>
              <Column field="familyName" header="Family Name" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                  <template #body="{data}">
                      <span> {{data.familyName}} </span>
                  </template>
              </Column>
              <Column header="Email" sortField="email" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span> {{data.email}}</span>
                  </template>
              </Column>
            </span>
               <span v-if="tableType =='mostUsedReports'">
              <Column field="reportName" header="First Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                  <div>
                    <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="../assets/svgs/buddy.svg" alt="" /> </span>
                    <span> {{data.firstName}} </span>
                 </div>
                </template>
            </Column>
              <Column field="familyName" header="Family Name" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                  <template #body="{data}">
                      <span> {{data.familyName}} </span>
                  </template>
              </Column>
              <Column header="Email" sortField="email" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span> {{data.email}}</span>
                  </template>
              </Column>
               <Column header="Report Name" sortField="reportName" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span> {{data.reportName}}</span>
                  </template>
              </Column>
               <Column header="Request Count" sortField="requestCount" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span> {{data.requestCount}}</span>
                  </template>
              </Column>
            </span>

            <span v-if="tableType=='deductions'">
              <Column field="partnerName" header="Partner Name" sortField="partnerName" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data.partnerName }}</span>
                </template>
              </Column>
              <Column field="reference" header="Item Type" sortField="reference" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data.reference }}</span>
                </template>
              </Column>
              <Column field="time" header="Quantity" sortField="quantity" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.quantity }} </span>
                </template>
              </Column>
              <Column field="currency" header="Currency" sortField="currency" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{`${data?.currency} ${ data?.currency && (currency_symbols[data?.currency.toUpperCase()] )}` }}  </span>
                </template>
              </Column>
              <Column field="amount" header="Amount" sortField="amount" :sortable="sortTable" style="min-width:13rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column field="date" header="Date" sortField="date" :sortable="sortTable" style="min-width: 13rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ formatDate(data.date.split("T")[0]) }}</span>
                  </template>
              </Column>

            <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <!-- <div>
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('correctCreditUpdate')">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div> -->
              </template>
            </Column>
            </span>

                  <span v-if="tableType=='statements'">
              <Column field="partnerName" header="Partner Name" sortField="partnerName" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data.partnerName }}</span>
                </template>
              </Column>
              <Column field="email" header="Email" sortField="email" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data.email && data.email.split(";")[0] }}</span>
                </template>
              </Column>
              <Column field="filename" header="File Name" sortField="fileName" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data.filename.split("/").pop() }}</span>
                </template>
              </Column>
              <Column field="created" header="Date" sortField="created" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{formatDate(data?.created.split("T")[0]) }} </span>
                </template>
              </Column>
              <Column field="lastModified" header="Last modified" sortField="lastModified" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{ formatDate(data?.lastModified.split("T")[0]) }}  </span>
                </template>
              </Column>

            <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text" @click.stop="toggle($event, data)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <div>
                    <Menu id="overlay_menu" ref="menu" :model="statementItems" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('statementActionClicked', item.label)">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div>
              </template>
            </Column>
            </span>

    </DataTable>
</template>
<script>
import { computed, ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useStore } from "vuex";
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { useClientUser } from "@/components/composition/clientHelper.js";
import { useCreditHelper } from '@/components/composition/creditHelper';

import NavBarItem from "@/components/NavBarItem";
import NavBarItemLabel from "@/components/NavBarItemLabel";
import NavBarMenu from "@/components/NavBarMenu";
import NavBarMenuDivider from "@/components/NavBarMenuDivider";
import UserAvatar from "@/components/UserAvatar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Icon from "@/components/Icon";

export default {
    components:{
        DataTable,
        Menu,
        Column,
        Button,
    UserAvatar,
    NavBarMenu,
    NavBarItem,
    NavBarItemLabel,
    NavBarMenuDivider,
    LanguageSwitcher,
    Icon,
    },
    emits:['rowClicked','rowData','editItemWasClicked'],

    props:{
        first:{
          type: Number,
          default: 0
        },
        clientName:{
          type: String,
          default: ''
        },
        customers:{
            type: Array,
            default: []
        },
        image:{
            type: Boolean,
            default: false
        },
        paginatorTemplate: {
            type: String,
        },
        paginator:{
            type: Boolean,
            default: false
        },
        rows:{
            type: Number,
            default: null
        },
        sortTable:{
          type: Boolean,
          default: true
        },
        rowHover:{
            type: Boolean,
            default: true
        },
        loading:{
            type: Boolean,
            default: false
        },
        rowsPerPageOptions:{
            type: Array,
            default: null
        },
        defaultText:{
            type: String,
            default: 'record'
        },
        tableType:{
          type: String,
          default: 'users'
        }

    },
    setup(props, {emit}) {
       const store = useStore();
       const { daysDiffrence } = useCreditHelper();
       const { userTypes, formatDate, tableStatePersistence, currency_symbols, fresDeskPriorities, fresDeskStatuses } = useClientUser();

      const menu = ref();

      const items = ref([
				{
					label: 'Request to Correct Credit Update'
				}
			])

      const statementItems = ref([
				{
					label: 'Download'
				}
			])

      const actions = ref([
				{
					label: 'Edit Client'
				},
        {
					label: 'Delete Client'
				}
			])




       const toggle = (event, data) => {
         console.log("event is...", event)
            emit("rowData", data)
            if(daysDiffrence(data?.dateOfUpdate) <=5){
              menu.value.toggle(event);
            }
        };
        const save = () => {
            // toast.add({severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000});
        };

        const showConsole = ()=>{

        }

        const dt = ref();
        const exportCSV = () => {
            dt.value.exportCSV();
        };


        return {
            showConsole,
            toggle,
            save,
            menu,
            dt,
            items,
            actions,
            exportCSV,
            statementItems,
            currency_symbols,
            daysDiffrence,
            fresDeskStatuses,
            fresDeskPriorities,
            tableStatePersistence,
            formatDate,
            userTypes
        }
    },
}
</script>
<style lang="scss">
.p-datatable-wrapper{
  margin-top: 20px;
}
.fixedheader .p-datatable-thead tr{
    position: fixed;
    width: calc(100% - 305px)  !important;
}
.fixedheader .p-datatable-tbody{
  margin-top: 57px;
}
.extra-body-margin .p-datatable-thead tr{
  height: 60px !important;
}
.fixedheader .p-paginator{
  position: sticky !important;
  inset-block-end: 0 !important;
}
.sticky-header-footer .p-paginator{
  position: sticky !important;
  inset-block-end: 0 !important;
}

.menu-width {
  width: 200px !important;
  min-width: 0px !important;
  left: calc(100% - 255px)  !important;
}

.custome-width{
    width: 160px;
}

::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;
  .p-progressbar-value {
    background-color: #607d8b;
  }
}
::v-deep(.p-datepicker) {
  min-width: 25rem;
  td {
    font-weight: 400;
  }
}
::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }
  .p-paginator {
    padding: 1rem;
  }
  .p-datatable-thead > tr > th {
    text-align: left;
  }
  .p-datatable-tbody > tr > td {
    cursor: auto;
  }
}

.my-center-text {
    width: 100%;
}
.my-center-text > svg{
    float: right;
}

.truncate > div {
    white-space:pre-wrap;
    word-wrap:break-word;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
.menu-position {
  position: absolute;
  top: -64px;
  left: 122px;
  max-height: 100;
  overflow: auto;
}
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}
</style>
