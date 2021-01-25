import { expect } from 'chai'
import { createMocks } from 'node-mocks-http';
import handleJobData from '../pages/api/jobs';

describe('Testing API with query attributes', () => {
    it('Searching', async () => {
        const { req, res } = createMocks({
            query: {
                search: 'Eastside Medical Center',
            },
        });

        const jobResponse = await handleJobData(req, res);
        const jestData = jobResponse._getData();
        expect(jestData.jobs.length).to.equal(1);
    });

    it('Filter by Shift', async () => {
        const { req, res } = createMocks({
            query: {
                filterType: 'work_schedule',
                filterValue: 'Day shift',
            },
        });

        const jobResponse = await handleJobData(req, res);
        expect(jobResponse.statusCode).to.equal(200);
    });

    it('Check object while filter', async () => {
        const { req, res } = createMocks({
            query: {
                filterType: 'experience',
                filterValue: 'Intermediate',
            },
        });

        const jobResponse = await handleJobData(req, res);
        const jestData = jobResponse._getData();
        expect(jestData.jobs).to.not.have.any.keys('firstKey', 'secondKey');
    });

    it('Search with empty object', async () => {
        const { req, res } = createMocks({
            query: {
                search: 'Fountain Valley One',
            },
        });

        const jobResponse = await handleJobData(req, res);
        const jestData = jobResponse._getData();
        expect(jestData.jobs).to.be.empty;
    });

    it('Search object have name property', async () => {
        const { req, res } = createMocks({
            query: {
                search: 'Fountain Valley',
            },
        });

        const jobResponse = await handleJobData(req, res);
        const jestData = jobResponse._getData();
        expect(jestData.jobs[0]).to.have.property('name', 'Fountain Valley Rgnl Hosp And Med Ctr - Euclid')
    });
})
